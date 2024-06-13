'use client'
import { useEffect, useState } from "react";
import Navbar from "../app/components/navbar";
import { Query, useQuery } from '@tanstack/react-query';
import { standSales } from "../app/api/vehiclesAPI";
import { UserModel } from "../app/models/user";
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import AuthProvider, { useAuth } from "../app/AuthProvider";
import { redirect } from "next/navigation";
import { verifyAuth } from "./api/utils/utils";
import { StatsModel } from "./models/stats";

const HomePage: React.FC = () => {

  const user = useAuth();
  let [username, setUsername] = useState(null);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");

    verifyAuth(user, (username: any) => {
      setUsername(username.username);
      console.log(username.username);
    });
  }, []);

  const { data, error, isLoading } = useQuery<StatsModel>({
    queryKey: ['stats'],
    queryFn: () => standSales(1),
    staleTime: 600000
  });


  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return <>
    <>
      <Navbar username={username} />
      <h2 className="mb-5 text-white">Stats Card</h2>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-6">
            <div className="card card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">Best Brand</h5>
                    {data?.BestBrand && <span className="h2 font-weight-bold mb-0">{data?.BestBrand || "None"}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">Vehicles Sales</h5>
                    <span className="h2 font-weight-bold mb-0">{(data?.VehiclesSales != null) ? data?.VehiclesSales : 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">Vehicles Available</h5>
                    {data?.VehiclesAvailable && <span className="h2 font-weight-bold mb-0">{data?.VehiclesAvailable || "0"}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card card-stats mb-4 mb-xl-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">Vehicles Sold</h5>
                    {data?.VehiclesSold && <span className="h2 font-weight-bold mb-0">{data?.VehiclesSold || 0}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  </>

}

const queryClient = new QueryClient();

const HomePageClient = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  </AuthProvider>
);

export default HomePageClient