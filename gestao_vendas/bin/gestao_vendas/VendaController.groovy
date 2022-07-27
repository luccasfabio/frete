package gestao_vendas

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class VendaController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [vendaList: Venda.list(params), vendaTotal: Venda.count()]
    }

    def listVenda(int length, int start){
        params.max = length;
        params.offset = start;
        int iCol=0;
        String search = params.getAt("search[value]")?.toString()?.trim(), 
               orderColumn = params.getAt("order[0][column]");
        
        List dados = Venda.createCriteria().list(params) {
            if (search && !search.equals("")){
                or {
                    //INSERIR RESTRIÇÕES DE FILTRO NAS COLUNAS
                }
            }
            
            if (orderColumn && params.getAt("columns["+orderColumn+"][data]")?.toString()!="")
                order(params.getAt("columns["+orderColumn+"][data]"),params.getAt("order[0][dir]"))
            else 
                order("id","desc")
        }
        
        def recordsTotal = Venda.count();
        def recordsFiltered = dados.totalCount;

        dados = dados.collect {it -> return [
            cliente : it.cliente?.nome,
            valorTotal : it.valorTotal
        ]}
        
        render contentType: "text/json", text: ["draw":params.draw,"recordsTotal":recordsTotal,"recordsFiltered":recordsFiltered,"data": dados ] as JSON;
    }

    def create() {
        [venda: new Venda(params)]
    }

    def save() {

        def venda = new Venda(params)
        if (!venda.save(flush: true)) {
            render(view: "create", model: [venda: venda])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'venda.label', default: 'Venda'), venda.id])
        redirect(action: "index", id: venda.id)
    }

    def edit(Long id) {
        def venda = Venda.get(id)
        if (!venda) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'venda.label', default: 'Venda'), id])
            redirect(action: "index")
            return
        }

        [venda: venda]
    }

    def update(Long id, Long version) {
        def venda = Venda.get(id)
        if (!venda) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'venda.label', default: 'Venda'), id])
            redirect(action: "index")
            return
        }

        if (version != null) {
            if (venda.version > version) {
                venda.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'venda.label', default: 'Venda')] as Object[],
                          "Another user has updated this Venda while you were editing")
                render(view: "edit", model: [venda: venda])
                return
            }
        }

        venda.properties = params

        if (!venda.save(flush: true)) {
            render(view: "edit", model: [venda: venda])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'venda.label', default: 'Venda'), venda.id])
        redirect(action: "index", id: venda.id)
    }

    def delete(Long id) {
        def venda = Venda.get(id)
        if (!venda) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'venda.label', default: 'Venda'), id])
            redirect(action: "index")
            return
        }

        try {
            venda.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'venda.label', default: 'Venda'), id])
            redirect(action: "index")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'venda.label', default: 'Venda'), id])
            redirect(action: "edit", id: id)
        }
    }

    def adicionarItem(){
        
        def venda = new Venda(params)
        
        if (venda.itensVenda==null)
            venda.itensVenda = []

        venda.itensVenda.add(new VendaItem())
        render(template:"itensVenda", model:[venda:venda])
    }

    def removerItem(int indice){
        def venda = new Venda(params)
        venda.itensVenda.remove(indice)
        def valorTotal = 0
        venda.itensVenda.each{valorTotal = valorTotal + it.valorTotalItem}
        venda.valorTotal = valorTotal
        render(template:"itensVenda", model:[venda:venda,attValorTotal:true])   
    }

    def carregarValores(int indice){
        def venda = new Venda(params)

        def valorUnitario = venda.itensVenda.get(indice).produto.valorPadrao
        def quantidade = venda.itensVenda.get(indice).quantidade
        def desconto = venda.itensVenda.get(indice).desconto
        
        venda.itensVenda.get(indice).valorUnitario = valorUnitario
        venda.itensVenda.get(indice).valorTotalItem = valorUnitario*quantidade - desconto

        def valorTotal = 0
        venda.itensVenda.each{valorTotal = valorTotal + it.valorTotalItem}
        venda.valorTotal = valorTotal

        render(template:"itensVenda", model:[venda:venda,attValorTotal:true])
    }

    def atualizarValorTotal(){
        def venda = new Venda(params)
        venda.valorTotal = new BigDecimal(params.get("aux"))
        render(template:"valorTotal",model:[venda:venda])
    }
}
