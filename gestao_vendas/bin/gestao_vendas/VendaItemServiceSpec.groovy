package gestao_vendas

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class VendaItemServiceSpec extends Specification {

    VendaItemService vendaItemService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new VendaItem(...).save(flush: true, failOnError: true)
        //new VendaItem(...).save(flush: true, failOnError: true)
        //VendaItem vendaItem = new VendaItem(...).save(flush: true, failOnError: true)
        //new VendaItem(...).save(flush: true, failOnError: true)
        //new VendaItem(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //vendaItem.id
    }

    void "test get"() {
        setupData()

        expect:
        vendaItemService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<VendaItem> vendaItemList = vendaItemService.list(max: 2, offset: 2)

        then:
        vendaItemList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        vendaItemService.count() == 5
    }

    void "test delete"() {
        Long vendaItemId = setupData()

        expect:
        vendaItemService.count() == 5

        when:
        vendaItemService.delete(vendaItemId)
        sessionFactory.currentSession.flush()

        then:
        vendaItemService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        VendaItem vendaItem = new VendaItem()
        vendaItemService.save(vendaItem)

        then:
        vendaItem.id != null
    }
}
