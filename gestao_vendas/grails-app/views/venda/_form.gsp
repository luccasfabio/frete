<div class="fieldcontain" >
    <label for="cliente" >
        <g:message code="venda.cliente.label" default="cliente" />
        <span class="required-indicator">*</span>
    </label>
        <g:select noSelection="${['null':'Selecione']}" name="cliente.id" from="${gestao_vendas.Cliente.list()}" value="${venda.cliente?.id}" optionKey="id" optionValue="nome"  />
        <button type="button" 
            class="btn btn-sm btn-info"
            onclick="ajaxPost(this, '${createLink(action:'adicionarItem')}', 'div-itens-venda');">
            Adicionar Item</button>
</div>

<%-- ADCIONAR ITEM A LISTA --%>
<div id="div-itens-venda" >
    <g:render template="itensVenda" />
</div>

<%-- VALOR TOTAL --%>
<div id="div-valor-total" >
    <g:render template="valorTotal" />
</div>
