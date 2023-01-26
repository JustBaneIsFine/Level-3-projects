export default function AccountFavorites() {
  return (
    <div className="mt-5 h-full">
      <div className="flex w-full justify-center border-b  bg-slate-400 text-center">
        Your favorites
      </div>
      <table className="mt-10 w-full max-w-full border-collapse  border border-slate-600 text-xs font-semibold">
        <tr className="border border-slate-600">
          <th className="border border-slate-600">Model</th>
          <th className="border border-slate-600">Cena</th>
          <th className="border border-slate-600">Godiste</th>
          <th className="border border-slate-600">Kubikaza</th>
          <th className="border border-slate-600">Gorivo</th>
          <th className="border border-slate-600">Kilometraza</th>
        </tr>
        <tr>
          <td className=" max-w-[140px]  overflow-hidden text-ellipsis  border border-slate-600">
            Car test name
          </td>
          <td className="border border-slate-600">22000e</td>
          <td className="border border-slate-600">xxx</td>
          <td className="border border-slate-600">xxxxxx</td>
          <td className="border border-slate-600">xxxxx</td>
          <td className="border border-slate-600">xxxxxx</td>
        </tr>
      </table>
    </div>
  );
}
