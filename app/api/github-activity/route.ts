export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/dev-caroline/events/public?per_page=15', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('GitHub API response error:', response.status, response.statusText);
      return Response.json([
        {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          action: `GitHub API error: ${response.status}`,
          status: 'ERROR',
        },
      ], { status: 200 });
    }

    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) {
      return Response.json([
        {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          action: 'No recent GitHub activity',
          status: 'INFO',
        },
      ], { status: 200 });
    }

    const logs = events
      .slice(0, 10)
      .map((event: any) => {
        let action = '';
        let status = 'INFO';

        try {
          if (event.type === 'PushEvent') {
            const commitCount = event.payload.commits?.length || 1;
            action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
            status = 'SUCCESS';
          } else if (event.type === 'PullRequestEvent') {
            const prAction = event.payload.action || 'updated';
            action = `${prAction} PR in ${event.repo.name}`;
            status = prAction === 'opened' ? 'SUCCESS' : 'INFO';
          } else if (event.type === 'CreateEvent') {
            const refType = event.payload.ref_type || 'branch';
            action = `Created ${refType} in ${event.repo.name}`;
            status = 'INFO';
          } else if (event.type === 'IssuesEvent') {
            const issueAction = event.payload.action || 'updated';
            action = `${issueAction} issue in ${event.repo.name}`;
            status = 'INFO';
          } else if (event.type === 'WatchEvent') {
            action = `Starred ${event.repo.name}`;
            status = 'INFO';
          } else {
            action = `${event.type} in ${event.repo.name}`;
            status = 'INFO';
          }
        } catch (e) {
          action = `Activity in ${event.repo?.name || 'repository'}`;
          status = 'INFO';
        }

        const eventTime = event.created_at
          ? new Date(event.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return {
          time: eventTime,
          action,
          status,
        };
      });

    return Response.json(logs.length > 0 ? logs : [
      {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        action: 'No recent activity to display',
        status: 'INFO',
      },
    ]);
  } catch (error) {
    console.error('GitHub API error:', error);
    return Response.json([
      {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        action: `GitHub API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        status: 'ERROR',
      },
    ], { status: 200 });
  }
}
