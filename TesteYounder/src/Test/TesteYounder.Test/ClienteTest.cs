using System;
using TesteYounder.Api.Controllers;
using TesteYounder.Api.Models;
using Xunit;

namespace TesteYounder.Test
{
    public class ClienteTest
    {
        [Fact(DisplayName = "Deve retornar clientes cadastrados")]
        public void deve_retornar_clientes_cadastrados()
        {
            bool exist;

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new ClienteController(context);
                var clientes = controller.GetCliente();
                exist = (clientes.Result.Value != null);
            }
            Assert.True(exist);
        }

        [Fact(DisplayName = "Deve retornar cliente por id")]
        public void deve_retornar_autor_por_id()
        {
            bool exist;

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new ClienteController(context);
                var clientes = controller.GetClienteModel(1);
                exist = (clientes.Result.Value != null);
            }
            Assert.True(exist);
        }

        [Fact(DisplayName = "Deve cadastrar um cliente")]
        public void deve_cadastrar_um_autor()
        {
            var cliente = new ClienteModel {Id = 4, Nome = "Teste de Oliveira", Cpf = "37378271098", Rg = "431403867", DataNascimento = new DateTime(1994, 03, 19) };

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new ClienteController(context);
                var cadastrar = controller.PostClienteModel(cliente);
                var result = controller.GetClienteModel(cliente.Id);
                Assert.Equal(cliente, result.Result.Value);
            }
        }

        [Fact(DisplayName = "Deve atualizar um cliente")]
        public void deve_atualizar_um_autor()
        {
            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new ClienteController(context);
                var atualizar = controller.PutClienteModel(new ClienteModel { Id = 1, Nome = "Erick H Oliveira", Cpf = "44243792801", Rg = "460743181", DataNascimento = new DateTime(1994, 03, 19) });
                var result = controller.GetClienteModel(1);
                Assert.Equal("Erick H Oliveira", result.Result.Value.Nome);
            }
        }

        [Fact(DisplayName = "Deve deletar cliente por id")]
        public void deve_deletar_autor_por_id()
        {
            bool deleted;

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new ClienteController(context);
                var deletar = controller.DeleteClienteModel(3);
                var result = controller.GetClienteModel(3);
                deleted = (result.Result.Value == null);
            }
            Assert.True(deleted);
        }
    }
}