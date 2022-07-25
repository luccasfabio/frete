package gestao_vendas

class Produto {

    String nome
    BigDecimal valorPadrao

    static constraints = {
        nome(nullable:false)
        valorPadrao(nullable:true)
    }
    
    public void setNome(String nome) {
        this.nome = nome?.trim()?.toUpperCase();
    }

    static mapping = {
        id generator:'sequence', params:[sequence:'sequence_produto']
    }
}
