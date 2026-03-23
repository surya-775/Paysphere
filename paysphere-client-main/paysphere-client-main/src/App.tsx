import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useUserInfoQuery } from "./redux/features/auth/auth";
import { role } from "./constants/role";

function App() {
  const { data } = useUserInfoQuery();
  return (
    <CommonLayout>
      {data?.role === role.agent && !data?.isApproved && (
        <div className="fixed text-sm left-1/2 -translate-x-1/2 w-full max-w-2xl bg-yellow-100 border-l-2 border-yellow-500 text-yellow-700 p-2 text-center shadow-md z-50 rounded-b-md">
          ⚠️ Your agent account is not approved yet. Please wait for admin
          approval.
        </div>
      )}
      {data?.walletId?.status === "blocked" && (
        <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-2xl bg-yellow-100 border-l-2 border-yellow-500 text-yellow-700 p-2 text-center shadow-md z-50 rounded-b-md">
          ⚠️ Your wallet is blocked.
        </div>
      )}
      <Outlet />
    </CommonLayout>
  );
}

export default App;
