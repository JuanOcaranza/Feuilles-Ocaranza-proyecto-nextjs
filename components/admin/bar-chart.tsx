"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { DataResume } from '@/lib/definitions';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

function formatData(data: DataResume[]) {
  const labels = data.map((item) => item.month).reverse();
  const profit = data.map((item) => item.profit).reverse();

  // Definir colores alternados para las barras
  const backgroundColors = data.map((_, index) => (index % 2 === 0 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(153, 102, 255, 0.2)'));
  const borderColors = data.map((_, index) => (index % 2 === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(153, 102, 255, 1)'));

  return {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: profit,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1.5,
      },
    ],
  };
  }

export default function BarChart({ className, data }: { className?: string, data?: DataResume[] }) {
  return (
    <div className={className}>
      { data ? 
        <Bar data={formatData(data)} /> 
      : <p> No sales data recorded. </p> }
    </div>
  );
}