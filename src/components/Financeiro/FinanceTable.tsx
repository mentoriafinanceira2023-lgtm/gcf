type Props = {
  lancamentos: any[]
}


function FinanceTable({ lancamentos }: Props) {

  return (

    <div>

      <h2>Contas a Receber</h2>

      <table>

        <thead>
          <tr>
            <th>DESCRIÇÃO</th>
            <th>CLIENTE</th>
            <th>VENCIMENTO</th>
            <th>VALOR</th>
            <th>STATUS</th>
          </tr>
        </thead>


        <tbody>

          {lancamentos.map((item, index) => (

            <tr key={index}>

              <td>{item.descricao}</td>

              <td>{item.cliente}</td>

              <td>{item.vencimento}</td>

              <td>{item.valor}</td>

              <td>{item.status}</td>

            </tr>

          ))}

        </tbody>


      </table>


    </div>

  )

}


export default FinanceTable