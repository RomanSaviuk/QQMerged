﻿using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using QuiQue.Models;
using System.Threading.Tasks;

namespace QuiQue
{
    public interface IJWTAuthenticationManager
    {
        public Task<string> Authenticate(string email, string password);
        public Task<bool> Registration(User new_user);
    }
    //генерація токенів, створення користувачів
    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {

        private readonly string tokenKey;
        private readonly QuickQueueContext _context;
        private readonly int salt = 12;

        public JWTAuthenticationManager(string tokenKey, QuickQueueContext context)
        {
            this.tokenKey = tokenKey;
            this._context = context;
        }

        public async Task<String> Authenticate(string email, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user is null)
            {
                return null;
            }
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(tokenKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.NameIdentifier, user.idUser.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public async Task<bool> Registration(User new_user)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == new_user.Email);
            if (user is not null)
            {
                return false;
            }
            new_user.Password = BCrypt.Net.BCrypt.HashPassword(new_user.Password, salt);
            await _context.AddAsync(new_user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
    public class UserCredentials //просто зручний клас для передавання даних користувача, хай буде
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}