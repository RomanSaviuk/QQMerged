using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace QuiQue.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetQueueTestController : ControllerBase
    {
        private readonly ILogger<GetQueueTestController> _logger;

        public GetQueueTestController(ILogger<GetQueueTestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<QueueTest> Get()
        {
            return Enumerable.Range(1, 10).Select(index => new QueueTest
            {
                Name = "User" + index.ToString()
            })
            .ToArray();
        }
    }
}
