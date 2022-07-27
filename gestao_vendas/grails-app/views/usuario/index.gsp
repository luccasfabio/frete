<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'usuario.label', default: 'Usuario')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css" type="text/css" />
        <asset:javascript src="jquery.min.js"/>
        <asset:javascript src="jquery.dataTables.min.js"/>
    </head>
    <body>
        <a href="#list-usuario" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
        <div class="nav" role="navigation">
            <ul>
                <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
                <li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
            </ul>
        </div>
        <div id="list-usuario" class="content" role="main">
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
                <div class="message" role="status">${flash.message}</div>
            </g:if>
            <table id="table-usuario">
                <thead>
                    <tr>
                        <th>
                            Ações
                        </th>
                        <th>
                            <g:message code="usuario.usuario.label" default="usuario" />
                        </th>
                        <th>
                            <g:message code="usuario.nome.label" default="nome" />
                        </th>
                        <th>
                            <g:message code="usuario.senha.label" default="senha" />
                        </th>
                    </tr>
                </thead>
            </table>
        </div>

        <script type="text/javascript">
            $('#table-usuario').DataTable( {
                "processing": true,
                "serverSide": true,
                "ajax": "${createLink(controller:"usuario", action:"listUsuario")}",
                "columns": [
                    {
                        "orderable": false,
                        "data": null,
                        "render": function (data, type, full, meta) { return '<a href="${createLink(controller:'usuario', action:'edit')}/'+ data.id +'" >Editar</a>'; }
                    },
                    {
                        "data": "usuario"
                    },
                    {
                        "data": "nome"
                    },
                    {
                        "data": "senha"
                    }
                ],
                "language": {
                    "url": "${assetPath(src: 'portuguese-brasil-datatable.json')}"
                }
            } );
        </script>
    </body>
</html>