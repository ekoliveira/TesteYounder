using System;
using System.Linq;
using TesteYounder.Api.Models;

namespace TesteYounder.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ClienteContext context)
        {
            context.Database.EnsureCreated();

            if (context.Clientes.Any())
            {
                return;
            }

            var clientes = new ClienteModel[]
            {
                new ClienteModel{ Nome = "Erick Henrique de Oliveira", Cpf="44243792801", Rg="460743181", DataNascimento= new DateTime(1994,03,19)},
                new ClienteModel{ Nome = "Paulo Rodrigo de Oliveira", Cpf="52406000079", Rg="195756551", DataNascimento= new DateTime(1990,11,19)},
                new ClienteModel{ Nome = "Maria de Fatima Santos Oliveira", Cpf="72711992098", Rg="371240955", DataNascimento= new DateTime(1969,07,01)},
            };

            foreach (ClienteModel cliente in clientes)
            {
                context.Clientes.Add(cliente);
            }

            context.SaveChanges();
        }
    }
}