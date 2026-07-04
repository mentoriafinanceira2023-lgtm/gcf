function AppHeader() {

  return (

    <header className="app-header">


      <div>

        <strong className="header-logo">
          Sistema GFA
        </strong>

        <span>
          Gestão Financeira e Consultoria
        </span>

      </div>


      <div className="header-user">

        <button className="notification">
          🔔
        </button>

        <div className="user-avatar">
          JO
        </div>

        <div>

          <strong>
            Jefferson Oliveira
          </strong>

          <p>
            Consultor Financeiro
          </p>

        </div>


      </div>


    </header>

  )

}


export default AppHeader