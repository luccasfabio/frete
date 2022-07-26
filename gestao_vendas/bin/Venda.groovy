package gestao_vendas

class Venda {
    
    Cliente cliente
    List itensVenda
    BigDecimal valorTotal

    static hasMany = [itensVenda:VendaItem]

    static constraints = {
        cliente(nullable:false)
        valorTotal(nullable:false,min:0.0)
        itensVenda(nullable:false, validator:{val->!val.isEmpty()})
    }

    static mapping = {
        id generator:'sequence', params:[sequence:'sequence_venda']
    }
}
