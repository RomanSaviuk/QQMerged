﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System;
using QuiQue.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using QuiQue.Service;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace QuiQue.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        private QuickQueueContext _context;

        private readonly IJWTAuthenticationManager _JWTAuthenticationManager;

        private readonly ITokenManager _tokenManager;

        private IEmailSender _emailSender;

        private Tocken_Master _TockenMaster;
        public AuthController(IEmailSender emailSender, QuickQueueContext context, ILogger<AuthController> logger, IJWTAuthenticationManager jWTAuthenticationManager, ITokenManager tokenManager, Tocken_Master TockenMaster)
        {
            _context = context;
            _logger = logger;
            _JWTAuthenticationManager = jWTAuthenticationManager;
            _tokenManager = tokenManager;
            _emailSender = emailSender;
            _TockenMaster = TockenMaster;
        }


        [HttpPost("/Login")]
        public async Task<IActionResult> Authenticate([FromBody] UserCredentials userCred)
        {
            var token = await _JWTAuthenticationManager.Authenticate(userCred.Email, userCred.Password);

            if (token == null)
                return Unauthorized();

            return Ok(token);
        }

        [HttpPost("/Register")]
        public async Task<IActionResult> Register(User user)
        {
            bool registration_result = await _JWTAuthenticationManager.Registration(user);

            if (!registration_result) // пошта зайнята іншим користувачем?
                return new ConflictObjectResult("Wrong credentials provided! (check your email/username/password and try again");
            try
            {
                //string messageStatus = await _emailSender.SendEmailAsync(user.Email);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

            return new OkObjectResult(user);
        }
        	
        [HttpPost("/logout")]
        public async Task<IActionResult> CancelAccessToken()
        {
            await _tokenManager.DeactivateCurrentAsync();

            return NoContent();
        }

        [HttpPost("/Register/Confirm")]
        public async Task<IActionResult> RegisterConfirm(User user)
        {
            //if (!await checkmodel(user)) // пошта зайнята іншим користувачем?
            //return new ConflictObjectResult("Wrong credentials provided! (check your email/username/password and try again");
            bool registration_result = await _JWTAuthenticationManager.Registrationconfirm(user);

            if (!registration_result) // пошта зайнята іншим користувачем?
                return new ConflictObjectResult("Wrong credentials provided! (check your email/username/password and try again");

            // confirm email
            //begin 
            string token = _TockenMaster.CreateToken(user.Email);
            var callbackUrl = Url.Action(
                        "ConfirmEmail",
                        "Account",
                        new { Token = token },
                        protocol: HttpContext.Request.Scheme);
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(user.Email,
                      $"Please confirm your account by clicking this link: : <a href='{callbackUrl}'>link</a>");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
            // end 
            return new OkObjectResult("");
        }
        class tokenJeson
        {
            public string email {get; set;}
        }
        [HttpPost("/Account/ConfirmEmail")]
        public async Task<IActionResult> ConfirmRegister([FromQuery] string Token)
        {
            //bool registration_result = await _JWTAuthenticationManager.Registration(user);
           
           tokenJeson result = JsonConvert.DeserializeObject<tokenJeson>(_TockenMaster.DecodToken(Token)); ;

            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == result.email);
            if (user == null)
                return BadRequest();

            user.Confirm = true;
            _context.Update(User);
            await _context.SaveChangesAsync();
            return new OkObjectResult($"{result.email}:)))");
        }
    }
}
