package gestao_vendas

class Usuario {

    String nome
    String usuario
    String senha

    static mapping = {
        id generator:'sequence', params:[sequence:'sequence_usuario']
    }

    static constraints = {
        nome (maxLength:255, nullable:false)
        usuario (maxLength:50, nullable:false)
        senha (maxLength:50, nullable:false, validator:{String val -> 
             return val.matches(".*[0-9].*") && val.matches(".*[a-zA-Z].*")
        })
    }
 
}
