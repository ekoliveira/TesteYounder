using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TesteYounder.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TesteYounder.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteContext _context;

        public ClienteController(ClienteContext context)
        {
            _context = context;
        }

        // GET: api/Cliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteModel>>> GetCliente()
        {
            return await _context.Clientes.ToListAsync();
        }

        // GET: api/Cliente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteModel>> GetClienteModel(int id)
        {
            var ClienteModel = await _context.Clientes.FindAsync(id);

            if (ClienteModel == null)
            {
                return NotFound();
            }

            return ClienteModel;
        }

        // PUT: api/Cliente
        [HttpPut]
        public async Task<IActionResult> PutClienteModel(ClienteModel ClienteModel)
        {
            try
            {
                var cliente = _context.Find<ClienteModel>(ClienteModel.Id);

                if (cliente == null)
                {
                    return NotFound();
                }

                _context.Entry(cliente).State = EntityState.Detached;
                cliente = ClienteModel;
                _context.Update(cliente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                var exception = ex;
                return BadRequest();
            }
        }

        // POST: api/Cliente
        [HttpPost]
        public async Task<ActionResult<ClienteModel>> PostClienteModel(ClienteModel ClienteModel)
        {
            _context.Clientes.Add(ClienteModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClienteModel", new { id = ClienteModel.Id }, ClienteModel);
        }

        // DELETE: api/Cliente/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClienteModel>> DeleteClienteModel(int id)
        {
            var ClienteModel = await _context.Clientes.FindAsync(id);
            if (ClienteModel == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(ClienteModel);
            await _context.SaveChangesAsync();

            return ClienteModel;
        }
    }
}