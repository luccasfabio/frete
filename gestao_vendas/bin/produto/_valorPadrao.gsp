    
<div class="fieldcontain ${hasErrors(bean: produto, field: 'valorPadrao', 'error')}">
    <label for="valorPadrao">
        <g:message code="produto.valorPadrao.label" default="valorPadrao" />
    </label>
    <g:field name="valorPadrao" value="${formatNumber(number: produto.valorPadrao, format: '###,###,##0.00')}" onkeyup="mascaraNumero(this);" />
    <button type="button" class="btn btn-sm btn-info" onclick="ajaxPost(this,'${createLink(controller:'produto', action:'carregarValorUltimoProduto')}', 'div-valor-padrao')">Carregar valor do último produto cadastrado</button>
</div>