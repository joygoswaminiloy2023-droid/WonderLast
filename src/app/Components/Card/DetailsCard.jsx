'use client'
import React, { useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  MapPin,
  Star,
  CalendarDays,
  Check,
  ArrowRight,
  X,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const DetailsCard = ({ details }) => {
  const router = useRouter();
  
  // Standard React state for reliability in Next.js 16/Turbopack
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { 
    _id, destinationName, country, description, imageUrl, 
    departureDate, price, category, reviewCount, rating, 
    duration, facilities 
  } = details;

  // --- Update Handler ---
  const onUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const updated_data = Object.fromEntries(data.entries());

    const res = await fetch(`http://localhost:5000/destination/${_id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updated_data)
    });

    const result = await res.json();
    if (result.modifiedCount > 0) {
      toast.success("Updated Successfully!");
      setIsEditModalOpen(false);
      router.refresh();
    } else {
      toast.info("No changes were made.");
    }
  };

  // --- Delete Handler ---
  const handleDelete = async () => {
 const res=await fetch(`http://localhost:5000/destination/${_id}`,{
  method:"DELETE",
  headers:{
    'content-type': 'application/json'
  },
 })
 const result=await res.json();

 if(result.deletedCount>0){
  toast.success("Deleted Successfully")
  setIsEditModalOpen(false);
  redirect('/Destination')
 }
 else{
  toast.error("Cannot Delete");
 }

  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-8 py-40 relative font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-[#777] text-[15px] hover:text-black transition font-medium"
          >
            <ArrowLeft size={18} />
            Back to Destinations
          </button>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="border border-[#e5e5e5] px-6 py-2.5 rounded-xl flex items-center gap-2 text-[14px] bg-white shadow-sm hover:bg-gray-50 transition font-bold text-gray-700"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button 
              onClick={() => setIsDeleteOpen(true)}
              className="border border-[#ffb3b3] text-[#ff5a5a] px-6 py-2.5 rounded-xl flex items-center gap-2 text-[14px] bg-white shadow-sm hover:bg-red-50 transition font-bold"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="w-full h-[550px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-[12px] border-white relative">
          <Image
            width={1400}
            height={800}
            src={imageUrl}
            alt={destinationName}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <div className="space-y-12">
            
            {/* Title & Meta Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#15A1BF] font-black uppercase text-[13px] tracking-[0.2em]">
                <MapPin size={16} />
                {country}
              </div>
              <h1 className="text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {destinationName}
              </h1>
              <div className="flex items-center gap-8 pt-2">
                <div className="flex items-center gap-2 bg-green-50 text-[#1E9E35] px-5 py-2 rounded-full font-black text-sm">
                  <Star size={18} className="fill-[#1E9E35]" />
                  {rating} <span className="opacity-40 font-bold ml-1">({reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
                  <CalendarDays size={20} className="text-[#15A1BF]" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <section className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100/50">
              <h2 className="text-3xl font-black mb-6 text-gray-900 tracking-tight">Overview</h2>
              <p className="text-xl leading-relaxed text-gray-500 font-medium">
                {description}
              </p>
            </section>

            {/* Highlights Section */}
            <section className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100/50">
              <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {facilities?.map((item, index) => (
                  <div key={index} className="flex items-center gap-5 p-5 rounded-[2rem] bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="bg-[#1E9E35] p-2 rounded-full text-white shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
                      <Check size={18} strokeWidth={4} />
                    </div>
                    <span className="font-bold text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="relative">
            <div className="sticky top-10 space-y-6">
              <div className="bg-[#15A1BF] text-white rounded-[3.5rem] p-12 shadow-2xl shadow-[#15A1BF]/40 border-t border-white/20">
                <p className="text-blue-100/60 text-xs font-black mb-1 uppercase tracking-[0.3em]">Total Experience</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-7xl font-black tracking-tighter">${price}</span>
                  <span className="text-blue-100/70 font-bold text-lg">/pax</span>
                </div>
                
                <div className="space-y-4 mb-10">
                    <div className="bg-white/10 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                        <p className="text-[11px] text-blue-100/50 font-black uppercase tracking-widest mb-1">Departure</p>
                        <p className="text-2xl font-black">{departureDate}</p>
                    </div>
                </div>

                <button className="w-full bg-white text-[#15A1BF] py-6 rounded-[2rem] flex items-center justify-center gap-4 font-black text-2xl hover:bg-gray-50 transition active:scale-[0.98] shadow-xl shadow-black/10 group">
                  Book Now
                  <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 text-center">
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Need help with booking?</p>
                  <p className="text-gray-900 font-black text-lg mt-1 underline">Contact Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CENTERED DELETE MODAL (PURE TAILWIND) --- */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" 
            onClick={() => setIsDeleteOpen(false)} 
          />
          <div className="bg-white w-full max-w-md relative z-10 rounded-[3rem] shadow-2xl p-12 text-center animate-in zoom-in duration-300">
            <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8 border-4 border-white shadow-xl shadow-red-100">
              <AlertTriangle size={48} />
            </div>
            
            <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Wait!</h3>
            <p className="text-gray-500 leading-relaxed mb-10 text-xl font-medium">
              You are about to delete <span className="text-black font-black underline decoration-red-200 decoration-4 underline-offset-4">{destinationName}</span>.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleDelete}
                className="w-full py-5 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-3xl font-black text-xl transition shadow-xl shadow-red-200 active:scale-95"
              >
                Yes, Delete it
              </button>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="w-full py-5 bg-gray-100 text-gray-500 rounded-3xl font-black text-xl hover:bg-gray-200 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CENTERED EDIT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" 
            onClick={() => setIsEditModalOpen(false)} 
          />
          <div className="bg-white w-full max-w-2xl relative z-10 rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="flex justify-between items-center px-12 pt-12 pb-6">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Edit Trip</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] mt-1">Ref ID: {_id}</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="bg-gray-100 p-4 rounded-full hover:bg-gray-200 transition shadow-sm"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={onUpdate} className="p-12 pt-4 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination Title</label>
                <input
                  name="destinationName"
                  defaultValue={destinationName}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] p-5 focus:bg-white focus:border-[#15A1BF] focus:ring-0 transition font-black text-xl text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                  <input name="country" defaultValue={country} className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] p-5 font-bold text-gray-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
                  <input name="price" type="number" defaultValue={price} className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] p-5 font-bold text-gray-800" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Trip Overview</label>
                <textarea rows={4} name="description" defaultValue={description} className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] p-5 font-medium text-gray-600 resize-none" />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-5 border-2 border-gray-100 rounded-[2rem] font-black text-gray-400 hover:bg-gray-50 transition"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-5 bg-[#15A1BF] text-white rounded-[2rem] font-black text-xl hover:bg-[#0f8ea8] shadow-xl shadow-[#15A1BF]/30 transition active:scale-95"
                >
                  Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;