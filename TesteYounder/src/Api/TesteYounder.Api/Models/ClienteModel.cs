using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteYounder.Api.Models
{
    public class ClienteModel
    {
        public ClienteModel()
        {
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Nome { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(11)")]
        public string Cpf { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(9)")]
        public string Rg { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime DataNascimento { get; set; }
    }
}