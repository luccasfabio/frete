
<div class="fieldcontain">
    <label for="produto">
        <g:message code="vendaItem.produto.label" default="produto"/>
        <span class="required-indicator">*</span>
    </label>
    <g:select name="produto.id" from="${gestao_vendas.Produto.list()}" value="${vendaItem.produto?.id}" optionKey="id" optionValue="nome"/>
</div>

<div id="div-valor-unitario" style="position: relative;">
    <g:render template="valorUnitario" model="[produto:produto]" />
</div>

<div class="fieldcontain">
    <label for="quantidade">
        <g:message code="vendaItem.quantidade.label" default="quantidade" />
        <span class="required-indicator">*</span>
    </label>
    <g:textField name="quantidade" value="${vendaItem?.quantidade}"/>
</div>

<div class="fieldcontain">
    <label for="desconto">
        <g:message code="vendaItem.desconto.label" default="desconto" />
    </label>
    <g:textField  name="desconto" value="${vendaItem?.desconto}"/>
</div>

<div id="div-valor-total" style="position: relative;">
    <g:render template="valorTotal" />
</div>



