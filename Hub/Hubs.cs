using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using QuiQue.Models;
using QuiQue;
using Microsoft.EntityFrameworkCore;

namespace QuiQue.Hubs
{
	public class QueueHub : Hub
	{

		private QuickQueueContext _DBcontext;

		public QueueHub(QuickQueueContext context)
		{
			_DBcontext = context;
		}
		public async Task updatequeue(string queueID) // + , List<User> list
		{
			await Clients.Group(queueID).SendAsync("Sendqueue", "this queue id " + queueID + " was changed");
		}
		public async Task updatequeueAll(string word)
		{
			await Clients.All.SendAsync("SendqueueAll", "start " + word);
		}
		public async Task NewConnectionToqueue(string queueID)
		{
			int id = Convert.ToInt32(queueID);
			if (await _DBcontext.Events.FirstOrDefaultAsync(e => e.EventId == id) != null)
			{
				await Groups.AddToGroupAsync(Context.ConnectionId, queueID);
				await Clients.All.SendAsync("MASSAGE", "WELL");
			}
			else
            {
				await Clients.All.SendAsync("MASSAGE", "BED");
			}
		}

		public override Task OnDisconnectedAsync(Exception exception)
		{
			return base.OnDisconnectedAsync(exception);
		}
	}
}