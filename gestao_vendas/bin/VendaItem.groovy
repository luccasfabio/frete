package gestao_vendas

class VendaItem {

    Produto  produto
    BigDecimal valorUnitario = 0
    BigDecimal quantidade = 1
    BigDecimal desconto = 0
    BigDecimal valorTotalItem = 0

    static mapping = {
        id generator:'sequence', params:[sequence:'sequence_vendaItem']
    }

    static belongsTo = Venda
    
    static constraints = {
        produto(nullable:false)
        valorUnitario(nullable:false)  
        quantidade(nullable:false,min:0.0)
        desconto(nullable:true)
        valorTotalItem(nullable:false, min:0.0) 
    }

    public void calcularValorTotal(){
        this.setValorTotalItem(this.quantidade*produto.valorPadrao - this.desconto)
    }

    public void setValorUnitario(BigDecimal valorUnitario){
        this.valorUnitario = valorUnitario
    }
    public void setValorTotalItem(BigDecimal valorTotalItem){
        this.valorTotalItem = valorTotalItem
    }
}
