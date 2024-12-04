"use client";
import Footer from "@/components/Footer";
import { Rp } from "@/helpers/currency";
import {
  ArrowUpCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { calculateRetirementPlan } from "@/helpers/Calculate";
import axios from "axios";
import { SavingType } from "@/type";
import AIRecommendationButton from "@/components/ui/gemini-button";
import Example from "@/components/ui/BarLoader";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Swal from "sweetalert2";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSaving, setDataSaving] = useState<SavingType[]>([]);
  const [totalSavings, setTotalSavings] = useState<SavingType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingAmount, setSavingAmount] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const getSaving = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/apis/savings/filter`,
        {
          params: {
            page,
            limit: 5,
            startDate,
            endDate,
          },
        }
      );

      // console.log(response.data, "response.data");
      setDataSaving(response.data.savings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSavingForTotalSaving = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/apis/savings`
      );
      // console.log("🚀 ~ getSavingForTotalSaving ~ data:", data);

      setTotalSavings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSaving = async () => {
    try {
      if(+savingAmount <= 0) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Amount must be greater than 0",
        });
      }
        
      await axios.post("/apis/savings", { amountSaved: savingAmount });

     
      // RevalidateByPath("/dashboard")
      // Fetch ulang data saving setelah data disimpan
      // const newSavings = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/apis/savings/filter`,
      // );
      // setDataSaving(newSavings.data);
      getSavingForTotalSaving();
      getSaving();

      // Tutup modal
      toggleModal();
    } catch (error) {
      console.error("Error submitting saving:", error);
    }
  };

  // Fetching both retirement data and savings data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/apis/retirement`
        );
        setData(response.data);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error);
      }
    };

    getSavingForTotalSaving();
    getSaving();
    fetchData();
  }, [page, startDate, endDate]);

  if (!Array.isArray(dataSaving)) {
    setDataSaving([]);
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (loading||!data)
    return (
      <div>
        <Example />
      </div>
    );

  const totalSaving = totalSavings.reduce((a, b) => a + b.amountSaved, 0);
  // console.log(totalSaving)

  const {
    currentAge,
    monthlySaving,
    monthlySpending,
    inflationRate,
    investationRate,
  } = data;


  const data2 = {
    currentAge,
    monthlySaving,
    monthlySpending,
    inflationRate,
    investationRate,
    totalSaving,
  };

  // Calculate final data using the helper function
  const finalData = calculateRetirementPlan(
    currentAge,
    monthlySaving,
    monthlySpending,
    inflationRate,
    investationRate
  );

  
  
  // Calculate progress as percentage
  
  const CalculateProgress = (totalSaving / finalData.targetSaving) * 100;
const formattedProgress = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(CalculateProgress);

const progress = formattedProgress


   return (
     <>
       <FloatingNav />
       <main className="max-w-[1100px] mx-auto">
         <div className="relative isolate overflow-hidden pt-16">
           {/* Header Section */}
           <header className="pb-4 pt-6 sm:pb-6">
             <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
               {/* Total Saving Box */}
               <div className="overflow-hidden rounded-xl border border-gray-200 group transition-all transform hover:scale-105 hover:shadow-2xl hover:opacity-90 w-full sm:w-auto">
                 <div className="flex items-center gap-x-4 border-b border-navy-dark/5 p-6">
                   <CurrencyDollarIcon className="size-6" />
                   <div className="text-sm/6 font-medium text-[#001f3f]">
                     Total Saving
                   </div>
                 </div>
                 <div className="px-6 py-4 text-sm/6 flex justify-center">
                   <span className="font-semibold text-[#001f3f]">
                     {Rp(totalSaving)}
                   </span>
                 </div>
               </div>

               {/* Radial Progress Bar */}
               <div className="relative flex justify-center items-center py-6 w-full sm:w-auto">
                 <div
                   className="absolute border-2 border-[#808080] rounded-full"
                   style={{
                     width: "13rem",
                     height: "13rem",
                   }}
                 ></div>
                 <div
                   className="radial-progress text-[#001f3f] group transition-all hover:scale-110"
                   style={
                     {
                       "--value": Number(CalculateProgress),
                       "--size": "12rem",
                       "--thickness": "5px",
                     } as React.CSSProperties
                   }
                   role="progressbar"
                   aria-valuenow={Number(progress)}
                   aria-valuemin={0}
                   aria-valuemax={100}
                 >
                   <span className="text-2xl font-bold text-[#001f3f] animate-pulse group-hover:scale-125 transition-all">
                     {progress} %
                   </span>
                 </div>
               </div>

               {/* Target Saving Box */}
               <div className="overflow-hidden rounded-xl border border-gray-200 group transition-all transform hover:scale-105 hover:shadow-2xl hover:opacity-90 w-full sm:w-auto">
                 <div className="flex items-center gap-x-4 border-b border-gray-900/5 p-6">
                   <CurrencyDollarIcon className="size-6" />
                   <div className="text-sm/6 font-medium text-[#001f3f]">
                     Target Saving
                   </div>
                 </div>
                 <div className="px-6 py-4 text-sm/6 flex justify-center">
                   <span className="font-semibold text-[#001f3f]">
                     {Rp(finalData.targetSaving)}
                   </span>
                 </div>
               </div>
             </div>
           </header>

           {/* Stats Section */}
           <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
             <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-2 xl:px-0 gap-6">
               {/* Inflation Rate */}
               <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 group hover:scale-105 hover:shadow-lg hover:opacity-90 transition-all duration-300 bg-[#001f3f] text-white rounded-lg">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003366] opacity-60 rounded-lg"></div>
                 <dt className="relative text-sm font-medium text-[#ffffff]">
                   Inflation Rate
                 </dt>
                 <dd className="relative w-full flex-none text-3xl font-medium tracking-tight text-white">
                   {finalData.inflationRate} <span>%</span>
                 </dd>
               </div>

               {/* Investment Rate */}
               <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 group hover:scale-105 hover:shadow-lg hover:opacity-90 transition-all duration-300 bg-[#001f3f] text-white rounded-lg">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003366] opacity-60 rounded-lg"></div>
                 <dt className="relative text-sm font-medium text-[#ffffff]">
                   Investment Rate
                 </dt>
                 <dd className="relative w-full flex-none text-3xl font-medium tracking-tight text-white">
                   {finalData.investmentRate} <span>%</span>
                 </dd>
               </div>

               {/* Monthly Saving */}
               <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 group hover:scale-105 hover:shadow-lg hover:opacity-90 transition-all duration-300 bg-[#001f3f] text-white rounded-lg">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003366] opacity-60 rounded-lg"></div>
                 <dt className="relative text-sm font-medium text-[#ffffff]">
                   Monthly Saving
                 </dt>
                 <dd className="relative w-full flex-none text-3xl font-medium tracking-tight text-white">
                   {Rp(finalData.monthlySaving)}
                 </dd>
               </div>

               {/* Monthly Spending */}
               <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 group hover:scale-105 hover:shadow-lg hover:opacity-90 transition-all duration-300 bg-[#001f3f] text-white rounded-lg">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003366] opacity-60 rounded-lg"></div>
                 <dt className="relative text-sm font-medium text-[#ffffff]">
                   Monthly Spending
                 </dt>
                 <dd className="relative w-full flex-none text-3xl font-medium tracking-tight text-white">
                   {Rp(finalData.monthlySpending)}
                 </dd>
               </div>

               {/* Estimated Retirement Age */}
               <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 group hover:scale-105 hover:shadow-lg hover:opacity-90 transition-all duration-300 bg-[#001f3f] text-white rounded-lg">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003366] opacity-60 rounded-lg"></div>
                 <dt className="relative text-sm font-medium text-[#ffffff]">
                   Estimated Retirement Age
                 </dt>
                 <dd className="relative w-full flex-none text-3xl font-medium tracking-tight text-white">
                   {finalData.retirementAge} years old
                 </dd>
               </div>
             </dl>
           </div>
         </div>

         {/* Recent Activity Table */}
         <div className="space-y-16 py-16 xl:space-y-20">
           <div>
             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-auto align-middle">
               <h2 className="mx-auto max-w-2xl text-base font-semibold text-navy-dark lg:mx-0 lg:max-w-none">
                 Recent activity
               </h2>
               {/* Recent Activity Filters */}
               <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg">
                 <div className="flex items-center space-x-2 w-full sm:w-auto">
                   <label
                     htmlFor="startDate"
                     className="text-sm font-medium text-[#001f3f]"
                   >
                     Start Date:
                   </label>
                   <input
                     type="date"
                     id="startDate"
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                     className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
                 <div className="flex items-center space-x-2 w-full sm:w-auto">
                   <label
                     htmlFor="endDate"
                     className="text-sm font-medium text-[#001f3f]"
                   >
                     End Date:
                   </label>
                   <input
                     type="date"
                     id="endDate"
                     value={endDate}
                     onChange={(e) => setEndDate(e.target.value)}
                     className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>

               <button
                 onClick={toggleModal}
                 className="bg-navy-dark text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-navy-light hover:scale-105 hover:shadow-lg mt-4 sm:mt-0"
               >
                 Add Savings
               </button>

               {/* ganti jadi button add savings */}
             </div>
             <div className="flex justify-between items-center py-4"></div>
             <div className="mt-6 overflow-hidden border-t border-gray-100">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                 <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                   <table className="w-full text-left">
                     <thead className="text-sm text-gray-900">
                       <tr>
                         <th className="bg-gray-50 border-gray-200 border-b py-2">
                           Amount
                         </th>
                         <th className="bg-gray-50 border-gray-200 border-b py-2">
                           Transaction Date
                         </th>
                       </tr>
                     </thead>
                     <tbody>
                       {dataSaving.map((transaction, index) => (
                         <tr key={transaction._id.toString()}>
                           <td className="relative py-5 pr-6">
                             <div className="flex gap-x-6">
                               <div className="text-gray-900 text-sm">
                                 {index + 1}
                               </div>
                               <ArrowUpCircleIcon
                                 aria-hidden="true"
                                 className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                               />
                               <div className="flex-auto">
                                 <div className="flex items-start gap-x-3">
                                   <div className="text-sm font-medium text-gray-900">
                                     Rp{" "}
                                     {transaction.amountSaved.toLocaleString()}
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </td>
                           <td className="py-5 text-sm text-gray-900">
                             {new Date(
                               transaction.createdAt
                             ).toLocaleDateString()}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                   <div className="flex justify-center items-center bg-white p-4 rounded-lg">
                     <button
                       onClick={handlePrevPage}
                       disabled={page === 1}
                       className="px-4 py-2 bg-white text-[#001f3f] font-semibold rounded-lg hover:bg-[#f1f1f1] disabled:opacity-50"
                     >
                       Prev
                     </button>
                     <span className="mx-4 text-[#001f3f] font-medium">
                       {page} of {totalPages}
                     </span>
                     <button
                       onClick={handleNextPage}
                       disabled={page === totalPages}
                       className="px-4 py-2 bg-white text-[#001f3f] font-semibold rounded-lg hover:bg-[#f1f1f1] disabled:opacity-50"
                     >
                       Next
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div>
             <AIRecommendationButton data={data2} />
           </div>
         </div>
       </main>
       <Footer />
       {/* Modal */}
       {isModalOpen && (
         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
             <h2 className="text-lg font-bold mb-4">Add Savings</h2>
             <form
               onSubmit={(e) => {
                 e.preventDefault();
                 handleSubmitSaving();
               }}
             >
               <div className="mb-4">
                 <label
                   htmlFor="amount"
                   className="block text-sm font-medium text-gray-700"
                 >
                   Amount Saved
                 </label>
                 <input
                   id="amount"
                   type="number"
                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm border-separate px-2"
                   value={savingAmount}
                   onChange={(e) => setSavingAmount(e.target.value)}
                   placeholder="Enter your saving amount"
                   min="0"
                   required
                 />
               </div>
               <div className="flex justify-between space-x-4">
                 <button
                   type="button"
                   className="bg-gray-200 px-4 py-2 rounded-md flex-1"
                   onClick={toggleModal}
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   className="bg-blue-500 text-white px-4 py-2 rounded-md flex-1"
                 >
                   Save
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
     </>
   );
}

