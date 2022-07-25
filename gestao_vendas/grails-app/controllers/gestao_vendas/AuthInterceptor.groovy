package gestao_vendas


class AuthInterceptor {

    AuthInterceptor() {
        matchAll()
        .excludes(controller:"usuario",action:"login")
        .excludes(controller:"usuario",action:"autenticar")
    }

    boolean before() { 
        if(session.user){
            true
        }else{
            redirect(controller:"usuario",action:"login")
            false
        }
     }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
