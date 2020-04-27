using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using TesteYounder.Api.Models;

namespace TesteYounder.Test
{
    public class CarregarBancoInMemory
    {
        public static ClienteContext DataInMemory()
        {
            var options = new DbContextOptionsBuilder<ClienteContext>()
                .EnableSensitiveDataLogging()
                .UseInMemoryDatabase(Guid
                .NewGuid().ToString()).Options;

            var context = new ClienteContext(options);

            context.Clientes.AddRange(new List<ClienteModel>()
            {
                new ClienteModel{Id =1, Nome = "Erick Henrique de Oliveira", Cpf="44243792801", Rg="460743181", DataNascimento= new DateTime(1994,03,19)},
                new ClienteModel{Id =2, Nome = "Paulo Rodrigo de Oliveira", Cpf="52406000079", Rg="195756551", DataNascimento= new DateTime(1990,11,19)},
                new ClienteModel{Id =3, Nome = "Maria de Fatima Santos Oliveira", Cpf="72711992098", Rg="371240955", DataNascimento= new DateTime(1969,07,01)},
            });

            context.SaveChanges();

            return context;
        }
    }
}