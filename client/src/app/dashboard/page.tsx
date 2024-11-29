"use client";

import { Fragment, useEffect, useState } from "react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RetirementPlan } from "@/db/models/retirementsPlan";
import { Rp } from "@/helpers/currency";
import { RetirementAge } from "@/helpers/RetirementAge";
import { SavingType } from "@/type";
import { FormatDate } from "@/helpers/IndonesianDate";

const stats = [
  {
    name: "Inflation Rate",
    selector: "inflationRate",
    suffix: "%",
  },
  {
    name: "Investment Rate",
    selector: "investationRate",
    suffix: "%",
  },
  {
    name: "Monthly Saving",
    selector: "monthlySaving",
    type: "price",
  },
  {
    name: "Monthly Spending",
    selector: "monthlySpending",
    type: "price",
  },
  {
    name: "Retirement Age",
    selector: "retirementAge",
    suffix: "years",
  },
];

export default function Dashboard() {
  const [loadingRetirement, setLoadingRetirement] = useState(true);
  const [loadingSaving, setLoadingSaving] = useState(true);
  const [targetSavingsHardcode, setTargetSavingsHardcode] = useState(1000); //hardcode data
  const [percentSaving, setPercentSaving] = useState(0);
  const [dataRetirementPlan, setDataRetirementPlan] = useState({
    UserId: "",
    currentAge: 0,
    monthlySaving: 0,
    monthlySpending: 0,
    inflationRate: 0,
    investationRate: 0,
    totalSavings: 0,
    retirementAge: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [dataSaving, setDataSaving] = useState<SavingType[]>([]);

  useEffect(() => {
    const getRetirement = async () => {
      setLoadingRetirement(true);
      try {
        const response = await fetch("/apis/retirement", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setDataRetirementPlan({
          ...data,
          retirementAge: RetirementAge(
            data.currentAge,
            data.monthlySaving,
            data.monthlySpending,
            data.inflationRate,
            data.investationRate
          ),
        });
        const percent = (data.totalSavings / targetSavingsHardcode) * 100;
        setPercentSaving(percent);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRetirement(false);
      }
    };
    getRetirement();
  }, []);

  useEffect(() => {
    const getSaving = async () => {
      setLoadingSaving(false);
      try {
        const response = await fetch("/apis/savings", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setDataSaving(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingSaving(false);
      }
    };
    getSaving();
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-[1100px] mx-auto">
        <div className="relative isolate overflow-hidden pt-16">
          {/* Secondary navigation */}
          <header className="pb-4 pt-6 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  <CurrencyDollarIcon className="size-6" />
                  <div className="text-sm/6 font-medium text-gray-900">
                    Total Saving
                  </div>
                </div>
                <div className="px-6 py-4 text-sm/6 flex justify-center content-center">
                  {loadingRetirement ? (
                    <div className="loading loading-dots loading-md text-primary"></div>
                  ) : (
                    <span className="font-semibold">
                      {Rp(dataRetirementPlan.totalSavings)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-center items-center py-6">
                  {/* Radial Progress Bar */}
                  <div
                    className="radial-progress text-blue-500"
                    style={{
                      "--value": percentSaving,
                      "--size": "12rem", 
                      "--thickness": "5px", 
                    }}
                    role="progressbar"
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span className="text-2xl font-bold text-gray-800 animate-pulse">
                      {percentSaving} %
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  <CurrencyDollarIcon className="size-6" />
                  <div className="text-sm/6 font-medium text-gray-900">
                    Target Saving
                  </div>
                </div>
                <div className="px-6 py-4 text-sm/6 flex justify-center content-center">
                  {loadingSaving ? (
                    <div className="loading loading-dots loading-md text-primary"></div>
                  ) : (
                    <span className="font-semibold">
                      {Rp(targetSavingsHardcode)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Stats */}
          <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
              {stats.map((stat, statIdx) => {
                const value =
                  dataRetirementPlan[stat.selector as keyof RetirementPlan] ||
                  "";
                const updatedValue = stat.type === "price" ? Rp(value) : value;
                return (
                  <div
                    key={stat.name}
                    className={`
                        ${
                          statIdx % 2 === 1
                            ? "sm:border-l"
                            : statIdx === 2
                            ? "lg:border-l"
                            : ""
                        }
                        flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8
                      `}
                  >
                    <dt className="text-sm/6 font-medium text-gray-500">
                      {stat.name}
                    </dt>
                    {loadingRetirement ? (
                      <div className="loading loading-dots loading-md text-primary"></div>
                    ) : (
                      <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                        {updatedValue || "-"}
                        <span>{stat.suffix}</span>
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </div>

          <div
            aria-hidden="true"
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
          >
            <div
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
            />
          </div>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          {/* Recent activity table */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 lg:max-w-none">
                Recent activity
              </h2>
            </div>
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
                        <tr key={index}>
                          <td className="relative py-5 pr-6">
                            <div className="flex gap-x-6">
                              <div className="text-gray-900 text-sm/6">
                                {index + 1}
                              </div>
                              <ArrowUpCircleIcon
                                aria-hidden="true"
                                className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                              />
                              <div className="flex-auto">
                                <div className="flex items-start gap-x-3">
                                  <div className="text-sm/6 font-medium text-gray-900">
                                    {Rp(transaction.amountSaved)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>

                          <td className="py-5 text-sm/6 text-gray-900">
                            {FormatDate(transaction.createdAt.toLocaleString())}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
