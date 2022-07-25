function gerarDefaultDataTable(controllerName, modulo) {
    modulo = gerarDefaultDataTable.arguments.length < 2 ? "" : modulo;
    $.extend(true, $.fn.dataTable.defaults, {
        stateSave: true,
        stateSaveCallback: function(settings, data) {
            /* salvo qual é o ultimo controller para poder verificar se mantem os filtros ou não */
            localStorage.setItem('Controller_atual', controllerName);
            
            /* salvamento da visibilidade das colunas */
            var colunasVisiveis = []
            if(! ( Object.keys(data).length === 0)){
                data.columns.forEach(function(valor){
                    colunasVisiveis.push(valor.visible)
                })
            }
            localStorage.setItem('visibilidade_colunas_'+controllerName, colunasVisiveis.toString());

            /* salva de fato os valores dos filtros do datatable */
            localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
        },
        stateLoadCallback: function(settings) {
            var ctrlAtualModulo = localStorage.getItem('Controller_atual' + modulo);
            var ctrlAtual = localStorage.getItem('Controller_atual');
            if ((ctrlAtual !== null && ctrlAtual !== controllerName) || (ctrlAtualModulo !== null && ctrlAtualModulo !== controllerName))
                localStorage.removeItem('DataTables_' + settings.sInstance);
                
            var storage = JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))

            //? pegar o valor salvo no localstorage das colunas visiveis
            var colunasVisiveis = (localStorage.getItem('visibilidade_colunas_'+controllerName));
            //? se a visibilidade das colunas foi salva
            if(colunasVisiveis){
                colunasVisiveis = colunasVisiveis.toString().split(',')
                //? se tiver sido adicionado ou removido outra coluna 
                if(colunasVisiveis.length == this.api().columns()[0].length){
                    for (var k = 0; k < colunasVisiveis.length; k++) {
                        //* esse codigo feio é para transformar os valores bool que sao salvos como string em bool de novo 

                        if(storage && !(Object.keys(storage).length === 0))
                            storage.columns[k].visible = (colunasVisiveis[k] === "true")
                        else
                            this.api().columns(k).visible(colunasVisiveis[k] === "true")
                    }
                }
            }
            return storage
        },
        // responsive: true,
        // 'autoWidth': false,
        processing: true,
        orderCellsTop: true,
        fixedHeader: true,
        serverSide: true,
        pagingType: $(window).width() < 768 ? "simple" : "simple_numbers",
        order: [],
        dom: "<'row pad-b-0'<'col-sm-6 col-md-6  align-items-center justify-content-start searchDatatable' f >" + // filter
            "<'col-sm-6 align-right 'B>>" +
            "<'row'<'col-sm-12 width-100 pad-0 of-x-s-mob' tr >>" + // the table and the processing 
            "<'row pad-b-0'<'col-sm-5 hidden-sm-down'i>" + // sumario de info
            "<'pull-right'p> " + // paging
            "<' pull-right'l> >" //length control
            ,
        buttons: [{
                extend: 'colvis',
                columns: ':gt(0)',
                columnText: function(dt, idx, title) {
                    return (idx)+' - '+title;
                    return title;
                },
                text: '<i class="fa fa-list"></i>',
                attr: {
                    title: 'Colunas',
                    rel: 'tooltip'
                },
                className: 'btn btn-sm btn-white  btn-purple'
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-table"></i>',
                attr: {
                    title: 'Gerar Excel',
                    rel: 'tooltip'
                },
                exportOptions: {
                    columns: [':visible :not(:first-child)'],
                    format:{
                        body: function(data, row, column, node) {
                            data = $('<p>' + data + '</p>').text();
                            if(!data.includes('<img')){
                   
                                return $.isNumeric(data.replace('.', '').replace(',', '.') )? data.replace('.', '') .replace(',', '.') : data;
                                
                            }
                        }
                    }
                },
                className: 'btn btn-white  btn-sm btn-success'
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i>',
                attr: {
                    title: 'Imprimir',
                    rel: 'tooltip'
                },
                exportOptions: {
                    columns: [':visible :not(:first-child)'], 
                    format:{
                        body: function(data, row, column, node) {
                            data = $('<p>' + data + '</p>').text();
                            if(!data.includes('<img')){
                   
                                return $.isNumeric(data.replace('.', '').replace(',', '.') )? data.replace('.', '') .replace(',', '.') : data;
                                
                            }
                        }
                    }
                },
                className: 'btn btn-sm btn-white  btn-warning'
            },
            {
                text: 'Limpar Filtros',
                text: '<i class="fa fa-refresh" ></i>',
                attr: {
                    title: 'Limpar Filtros',
                    rel: 'tooltip'
                },
                className: 'btn btn-sm btn-white btn-pink',
                action: function(e, dt, node, config) {
                    $('table.dataTable').DataTable().state.clear();
                    window.location.reload();
                }
            }
        ],
        columnDefs: [
            { "width": "10px", "targets": 0 }
        ],
        autoWidth: true,
        lengthMenu: [10, 25, 50, 100],
        language: {
            emptyTable: "<span class='color-danger'>Nenhum registro encontrado</span>",
            info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 até 0 de 0 registros",
            infoFiltered: "(Filtrando de _MAX_ registros)",
            infoPostFix: "",
            infoThousands: ".",
            lengthMenu: "<span class=\"ml-3\"></span>_MENU_",
            loadingRecords: "Carregando...",
            processing: "<button class=\"btn btn-info btn-icon text-white rounded-circle\" type=\"button\" disabled><span class=\"fal fa-spinner fa-spin\" role=\"status\" aria-hidden=\"true\"></span><span class=\"sr-only\">Carregando...</span></button> <strong class=\"ml-2\">Carregando</strong>",
            zeroRecords: "<span class='color-danger'>Nenhum registro encontrado</span>",
            searchPlaceholder: "Pesquisar",
            aria: {
                SortAscending: ": Ordenar colunas de forma ascendente",
                SortDescending: ": Ordenar colunas de forma descendente"
            },
            search: '',
            sLengthMenu: "_MENU_"

        },
        fnDrawCallback: function(settings) {
            $(".dataTables_paginate .previous:not(.disabled), .dataTables_paginate .next:not(.disabled), .dataTables_wrapper thead tr:eq(1) th").attr("rel", "tooltip");
            $(".dataTables_paginate .previous:not(.disabled)").attr("title", "Anterior");
            $(".dataTables_paginate .next:not(.disabled)").attr("title", "Próximo");
            // ver como q funciona esse cara
            $('.dataTables_wrapper thead tr:eq(1) th .form-control').parent().attr("title", "Filtrar");

            $('.tooltip').tooltip("hide");
            
            $(".dataTables_wrapper [rel=popover], .dataTables_wrapper [data-rel=popover]").popover();
            $(".dataTables_wrapper [rel=popover-hover], .dataTables_wrapper [data-rel=popover-hover]").popover({ "trigger": "hover" });
            $('[data-rel=tooltip]').tooltip();
        },
        fnInitComplete: function(oSettings, json) {
            var cols = oSettings.aoPreSearchCols;
            for (var i = 0; i < cols.length; i++) {
                var colunasOcultasAntes = 0;
                var j;
                for(j=0; j<=i; j++){
                    if(!this.api().columns().visible()[j]){ //conta quantas ocultas tem antes da coluna que foi acionada
                        colunasOcultasAntes++;
                    }
                }

                // colunasOcultasAntes=0
                var value = cols[i].sSearch;
                var selectFiltro = $(".dataTables_wrapper thead tr:eq(1) th:eq("+(i-colunasOcultasAntes)+") select");
                if(this.api().column(i).visible()){
                    if (selectFiltro.length > 0){
                        if (value.trim()=='')
                            selectFiltro.selectedIndex =0
                        else                                                            
                            selectFiltro.val(value);
                    }else{
                        $(".dataTables_wrapper thead tr:eq(1) th:eq("+(i-colunasOcultasAntes)+") input").val(value);
                    }
                }
                
                // inicializar o os campos com os highlights
                if(this.api().column(i).visible()){
                    var select = $('#dt_list > thead > tr.filter-line > th:nth-child('+(i-colunasOcultasAntes+1)+') > select')
                    if(select.length> 0){
                        if((select[0].selectedIndex !== 0 )){
                            $( this.api().column( i ).nodes() ).addClass( 'highlight' );
                        }
                    }else 
                    if (this.api().column(i).search()!='' ){
                        $( this.api().column( i ).nodes() ).addClass( 'highlight' );
                    }
                }
            }

            $("#dt_list thead tr th input").bind( 'keyup', buscarFiltroColuna);
            $("#dt_list thead tr th select").bind( 'change', buscarFiltroColuna);
            $("#dt_list thead tr th .datapickerNormalCRAW").bind( 'apply.daterangepicker', buscarFiltroColuna);
            
            $('#dt_list').css("filter", " blur(0)");
        },
    })


    $.extend(true, $.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control ml-0 w-100 fs-xs",
        "sProcessing": "dataTables_processing card justify-content-center align-items-center"
    });
    $('#dt_list').attr('style','width:100%');

}

function adicionarFuncoesDT(table){

    $('#sample-table-2_wrapper').css("display", "block");
    $('#sample-table-2_wrapper').css("animation","fadein 0.5s");

    table.on('draw', function(){  //acontece toda vez que atabela é renderizada na tela
        // funcao de deixar os campos destacados na tela
        var table = $(this).DataTable()
        var body = $( table.table().body() );
        body.unhighlight();
        body.highlight( table.search(), { caseSensitive: false } ); 



        // dar highlight nas colunas que tem algo sendo pesquisado
        var tam =table.columns()[0].length
        for(var i=0; i<tam;i++){
            var ehSelect =false
            var colunasOcultasAntes=0
            
            if(table.column(i).visible()){
                for(var j=0; j<=i; j++){
                    if(!table.columns().visible()[j]){
                        colunasOcultasAntes++
                    }
                }
                var select = $('#dt_list > thead > tr.filter-line > th:nth-child('+(i-colunasOcultasAntes+1)+') > select')
                if(select.length> 0){
                    if((select[0].selectedIndex !== 0 )){
                        $( table.column( i ).nodes() ).addClass( 'highlight' );
                    } else {
                        $( table.column( i ).nodes() ).removeClass( 'highlight' );    
                    }
                } else if (table.column(i).search()!=''){
                    $( table.column( i ).nodes() ).addClass( 'highlight' );
                } else if (table.column(i).search()==''){
                    $( table.column( i ).nodes() ).removeClass( 'highlight' );
                }
            }
        }
    }).on( 'column-visibility.dt', function (e, settings, column, state) {
        var dataTableAux = $(this).DataTable();
            if(state){
                var colunasOcultasAntes = 0;
                for(var i=0; i<=column; i++){
                    if(!dataTableAux.columns().visible()[i]){ //conta quantas ocultas tem antes da coluna que foi acionada
                        colunasOcultasAntes++;
                    }
                }
                //pegando o campo que acabou de aparecer na tela
                var filtro = $(".dataTables_wrapper thead tr:eq(1) th:eq("+(column-colunasOcultasAntes)+") select, .dataTables_wrapper thead tr:eq(1) th:eq("+(column-colunasOcultasAntes)+") input, .dataTables_wrapper thead tr:eq(1) th:eq("+(column-colunasOcultasAntes)+") .datapickerNormalCRAW");
                if (filtro.length > 0){
                    // dando bind no campo que acabou de aparecer na tela com o evento que faz a pesquisa
                    $(".dataTables_wrapper thead tr:eq(1) th:eq("+(column-colunasOcultasAntes)+") input").unbind( "keyup" ).bind( 'keyup', buscarFiltroColuna)
                    $(".dataTables_wrapper thead tr:eq(1) th:eq("+(column-colunasOcultasAntes)+") select").unbind( "change" ).bind( 'change', buscarFiltroColuna)
                    $(".dataTables_wrapper thead tr:eq(1) th:eq("+(column-colunasOcultasAntes)+") .datapickerNormalCRAW").unbind( "apply.daterangepicker" ).bind( 'apply.daterangepicker', buscarFiltroColuna).bind( 'cancel.daterangepicker', function(e){
                            this.value=''
                            this.placeholder='DD/MM/AAAA - DD/MM/AAAA'
                            $(this).trigger( "change" );
                        } );
                    // fazer a pesquisa no filtro que acabou de aparecer na tela
                    dataTableAux.columns(column).search(filtro.val())
                }
            }else
                dataTableAux.columns(column).search('');

            dataTableAux.draw();
    }).on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {
        if(showHide){
            $('.tooltip').tooltip("hide");
            $(".dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [rel=tooltip], .dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [data-rel=tooltip], .dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [data-toogle=tooltip]").tooltip();
            $(".dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [rel=popover], .dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [data-rel=popover]").popover();
            $(".dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [rel=popover-hover], .dataTables_wrapper tbody .child .dtr-details[data-dtr-index="+row.index()+"] [data-rel=popover-hover]").popover({"trigger":"hover"});
        }
    }).on('click', 'tr td:first-child a,tr td:first-child button', function(e){
        $(this).parent().parent().removeClass('parent');
        $(this).parent().parent().siblings('.child').hide();
    })

}
function buscarFiltroColuna(e) {
    if (e.which !== 0 &&
        ($(this).hasClass('comboboxautocomplete-datatable') || (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18 && event.keyCode != 19 && event.keyCode != 20 && event.keyCode != 27))) {
        var tableListAux = $("#dt_list").DataTable();
        tableListAux.columns($(this).parent().index() + ':visible')
            .search(this.value)
            .draw();
    }
}

function mostrarPopover() {
    if ($('.popover').css('display','none')){
        $(this).css('display','block');
    }
    $(this).popover('show')
}

// 321

