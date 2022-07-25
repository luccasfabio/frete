package gestao_vendas

class Cliente {

    String nome
    String cpfCnpj
    String email

    static mapping = {
        id generator:'sequence', params:[sequence:'sequence_cliente']
    }

    static constraints = {
        nome(maxLength:255, nullable:false)
        email(email:true, nullable:true)
        cpfCnpj(maxLength:14, validator:{String val ->
          return  val.isNumber() && (val.length() == 11 || val.length() == 14)
        })
    }
}
