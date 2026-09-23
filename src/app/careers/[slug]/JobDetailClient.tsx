"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Clock,
  IndianRupee,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Loader2,
  FileText,
  X,
  AlertCircle,
  Briefcase,
  ShieldCheck,
  Send,
  ChevronDown,
  Check,
} from "lucide-react";
import banner from "@/assets/career-banner.webp";
import toast, { Toaster } from "react-hot-toast";

// ─── Custom Inline Select (no Portal — works inside scrollable modals) ────────
interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  hasError = false,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all font-medium text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
          hasError
            ? "border-red-400 bg-red-50/50 text-gray-900"
            : open
            ? "border-primary ring-2 ring-primary/20 bg-gray-50/50 text-gray-900"
            : "border-gray-200 bg-gray-50/50 text-gray-900"
        }`}
      >
        <span className={selectedLabel ? "text-gray-900" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown list (inline, no portal) */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl border border-gray-100 bg-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors text-left ${value === opt.value
                ? "bg-primary/8 text-primary"
                : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              {opt.label}
              {value === opt.value && (
                <Check size={14} className="text-primary shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export default function JobDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [job, setJob] = useState<any>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);

  useEffect(() => {
    setIsLoadingJob(true);
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/careers`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.jobs)) {
          const found = json.jobs.find((j: any) => j.slug === slug);
          setJob(found || null);
        }
      })
      .catch(() => setJob(null))
      .finally(() => setIsLoadingJob(false));
  }, [slug]);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [source, setSource] = useState("");
  const [otherSource, setOtherSource] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // UI status states
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Field validation (inline highlight on submit) ─────────────────────────
  const clearError = (field: string) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case "fullName":
        return value.trim() ? "" : "Please enter your full name";
      case "email": {
        if (!value.trim()) return "Please enter your email address";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? ""
          : "Please enter a valid email address (e.g. name@example.com)";
      }
      case "phone": {
        if (!value.trim()) return "Please enter your phone number";
        return value.replace(/\D/g, "").length >= 10
          ? ""
          : "Please enter a valid phone number (at least 10 digits)";
      }
      case "currentLocation":
        return value.trim() ? "" : "Please enter your current location";
      case "totalExperience":
        return value ? "" : "Please select your total experience";
      case "noticePeriod":
        return value ? "" : "Please select your notice period";
      case "resumeFile":
        return value ? "" : "Please upload your resume (PDF/DOCX)";
      case "source":
        return value ? "" : "Please select how you heard about us";
      case "referrerName":
        return value.trim()
          ? ""
          : "Please enter the name of the employee who referred you";
      case "otherSource":
        return value.trim() ? "" : "Please specify how you heard about us";
      case "linkedin": {
        if (!value.trim()) return "";
        return /^https?:\/\/[^\s]+\.[^\s]+/i.test(value.trim())
          ? ""
          : "Please enter a valid URL (starting with https://)";
      }
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const check = (field: string, value: any) => {
      const msg = validateField(field, value);
      if (msg) newErrors[field] = msg;
    };

    check("fullName", fullName);
    check("email", email);
    check("phone", phone);
    check("currentLocation", currentLocation);
    check("totalExperience", totalExperience);
    check("noticePeriod", noticePeriod);
    check("resumeFile", resumeFile);
    check("source", source);
    if (source === "Employee Referral") check("referrerName", referrerName);
    if (source === "Other") check("otherSource", otherSource);
    check("linkedin", linkedin);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-gray-900 focus:outline-none transition-all font-medium text-sm disabled:opacity-60 ${
      hasError
        ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
        : "border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
    }`;

  const renderError = (field: string) =>
    errors[field] ? (
      <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
        <AlertCircle size={12} className="shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  if (!isLoadingJob && !job) {
    notFound();
  }

  if (isLoadingJob || !job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  // Handle file validation and setting
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, resumeFile: "File size must be under 5MB" }));
      return;
    }

    // Validate type
    const validExtensions = [".pdf", ".docx", ".doc"];
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      setErrors((prev) => ({ ...prev, resumeFile: "Please upload a PDF or DOCX file" }));
      return;
    }

    setResumeFile(file);
    setErrorMessage(null);
    clearError("resumeFile");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setCurrentLocation("");
    setTotalExperience("");
    setNoticePeriod("");
    setExpectedCtc("");
    setSource("");
    setOtherSource("");
    setReferrerName("");
    setCoverLetter("");
    setResumeFile(null);
    setIsDragging(false);
    setErrorMessage(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields; highlight problems inline on each field
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields");
      requestAnimationFrame(() => {
        document
          .querySelector('[aria-invalid="true"]')
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("jobTitle", job.title);
      formData.append("jobCategory", job.category);
      formData.append("jobLocation", job.location);
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("linkedin", linkedin.trim() || "Not provided");
      formData.append("currentLocation", currentLocation.trim() || "Not specified");
      formData.append("totalExperience", totalExperience || "Not specified");
      formData.append("noticePeriod", noticePeriod || "Not specified");
      formData.append("expectedCtc", expectedCtc.trim() || "Not specified");
      let finalSource = source || "Not specified";
      if (source === "Other" && otherSource.trim()) {
        finalSource = `Other: ${otherSource.trim()}`;
      } else if (source === "Employee Referral" && referrerName.trim()) {
        finalSource = `Employee Referral (Referred by: ${referrerName.trim()})`;
      }
      formData.append("source", finalSource);
      formData.append("coverLetter", coverLetter.trim() || "Not provided");

      if (resumeFile) {
        formData.append("resume", resumeFile, resumeFile.name);
      }

      console.log("Submitting job application...");

      const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/apply-job`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("API response:", result);

      if (response.ok && result.success) {
        setIsSubmitted(true);
        resetForm();
        toast.success("Application submitted successfully!");
      } else {
        const msg = result.error || "Failed to submit application. Please try again.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const msg = "Network error. Please check your connection and try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDialog = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Toaster position="top-right" />
      <Header visible={true} />

      <PageHero title="Job Detail" backgroundImage={banner.src} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Top Info Banner */}
        <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-gray-100 shadow-sm mb-10 md:mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {job.category}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100 text-sm">
                <MapPin size={16} className="text-primary" /> {job.location}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100 text-sm">
                <Clock size={16} className="text-primary" /> {job.type}
              </span>
              {job.experience && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100 text-sm">
                  <Briefcase size={16} className="text-primary" /> {job.experience}
                </span>
              )}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100 text-sm">
                <IndianRupee size={16} className="text-primary" /> {job.salary}
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={handleOpenDialog}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-2xl bg-primary text-white font-bold text-base transition-all duration-300 shadow-xl shadow-primary/25 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer"
            >
              <span>Apply for this Position</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Job Details (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-10">
            {/* About the Role */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                About the Role
              </h3>
              {job.about.map((para, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Key Responsibilities
              </h3>
              <ul className="space-y-4">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 md:gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <span className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Requirements
              </h3>
              <ul className="space-y-4">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 md:gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <span className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Summary Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl md:rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Role Overview</h3>
                <p className="text-gray-500 text-xs font-medium">Quick snapshot of this position</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Department</span>
                  <span className="text-gray-900 font-bold">{job.category}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="text-gray-900 font-bold">{job.location}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Employment Type</span>
                  <span className="text-gray-900 font-bold">{job.type}</span>
                </div>
                {job.experience && (
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Experience</span>
                    <span className="text-gray-900 font-bold">{job.experience}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Compensation</span>
                  <span className="text-gray-900 font-bold">{job.salary}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your application and resume are securely transmitted directly to our talent acquisition team.
                </p>
              </div>

              <button
                onClick={handleOpenDialog}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 hover:!bg-black cursor-pointer"
              >
                <span>Apply for this Position</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Application Form Dialog Modal */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          } else {
            handleOpenDialog();
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0 rounded-3xl border border-gray-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] bg-white block"
        >
          {/* Modal Header (Sticky at top) */}
          <div className="sticky top-0 z-20 p-6 md:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative shadow-md">
            <button
              onClick={handleCloseDialog}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>
            <DialogHeader className="text-left pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold w-fit mb-2">
                <Briefcase size={12} /> {job.category}
              </div>
              <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                Apply: {job.title}
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-sm">
                Join our team and build the next generation of AI-native enterprise platforms.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Modal Form Body */}
          <div className="p-6 md:p-8">
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Application Received!
                </h4>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for applying for the <span className="font-bold text-gray-900">{job.title}</span> role. Our talent acquisition team has received your resume and details.
                </p>
                <button
                  onClick={handleCloseDialog}
                  className="py-3 px-8 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Full Name (Required) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearError("fullName");
                    }}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.fullName}
                    className={inputClass(!!errors.fullName)}
                    placeholder="e.g. Rajesh Kumar"
                  />
                  {renderError("fullName")}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Address (Required) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearError("email");
                      }}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      className={inputClass(!!errors.email)}
                      placeholder="rajesh@example.com"
                    />
                    {renderError("email")}
                  </div>

                  {/* Phone Number (Required) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clearError("phone");
                      }}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.phone}
                      className={inputClass(!!errors.phone)}
                      placeholder="+91 98765 43210"
                    />
                    {renderError("phone")}
                  </div>
                </div>

                {/* LinkedIn Profile (Optional/Recommended) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      LinkedIn Profile
                    </label>
                    <span className="text-xs font-normal text-gray-400">Recommended</span>
                  </div>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                      clearError("linkedin");
                    }}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.linkedin}
                    className={inputClass(!!errors.linkedin)}
                    placeholder="https://linkedin.com/in/username"
                  />
                  {renderError("linkedin")}
                </div>

                {/* Current Location (Required) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Current Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={currentLocation}
                    onChange={(e) => {
                      setCurrentLocation(e.target.value);
                      clearError("currentLocation");
                    }}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.currentLocation}
                    className={inputClass(!!errors.currentLocation)}
                    placeholder="e.g. Bengaluru, Mumbai, Delhi-NCR, Hyderabad"
                  />
                  {renderError("currentLocation")}
                </div>

                {/* Experience & Notice Period Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Total Experience (Required) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Total Experience <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      value={totalExperience}
                      onChange={(val) => {
                        setTotalExperience(val);
                        clearError("totalExperience");
                      }}
                      hasError={!!errors.totalExperience}
                      disabled={isSubmitting}
                      required
                      placeholder="Select exp..."
                      options={[
                        { value: "Fresher (< 1 Year)", label: "Fresher (< 1 Year)" },
                        { value: "1 - 2 Years", label: "1 - 2 Years" },
                        { value: "2 - 4 Years", label: "2 - 4 Years" },
                        { value: "4 - 6 Years", label: "4 - 6 Years" },
                        { value: "6+ Years", label: "6+ Years" },
                      ]}
                    />
                    {renderError("totalExperience")}
                  </div>

                  {/* Notice Period (Required) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Notice Period <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      value={noticePeriod}
                      onChange={(val) => {
                        setNoticePeriod(val);
                        clearError("noticePeriod");
                      }}
                      hasError={!!errors.noticePeriod}
                      disabled={isSubmitting}
                      required
                      placeholder="Select notice..."
                      options={[
                        { value: "Immediate (0 days)", label: "Immediate (0 days)" },
                        { value: "15 Days", label: "15 Days" },
                        { value: "30 Days", label: "30 Days" },
                        { value: "45 Days", label: "45 Days" },
                        { value: "60 Days", label: "60 Days" },
                        { value: "90 Days", label: "90 Days" },
                      ]}
                    />
                    {renderError("noticePeriod")}
                  </div>
                </div>

                {/* Expected CTC */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Expected CTC / Budget
                    </label>
                    <span className="text-xs font-normal text-gray-400">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={expectedCtc}
                    onChange={(e) => setExpectedCtc(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm disabled:opacity-60"
                    placeholder="e.g. ₹8 - ₹12 LPA or Negotiable"
                  />
                </div>

                {/* Upload Resume (Required) */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Upload Resume <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />

                  {resumeFile ? (
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-primary/30 bg-primary/5">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <FileText size={18} />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(resumeFile.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeResume}
                        disabled={isSubmitting}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer group ${isDragging
                        ? "border-primary bg-primary/5"
                        : errors.resumeFile
                        ? "border-red-400 bg-red-50/50"
                        : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-primary/50"
                        }`}
                    >
                      <UploadCloud
                        size={26}
                        className={`mx-auto mb-1.5 transition-colors duration-300 ${isDragging
                          ? "text-primary scale-110"
                          : "text-gray-400 group-hover:text-primary"
                          }`}
                      />
                      <p className="text-sm text-gray-600 font-bold mb-0.5">
                        Click to upload or drag &amp; drop
                      </p>
                      <p className="text-xs text-gray-400 font-medium">
                        PDF, DOCX up to 5MB
                      </p>
                    </div>
                  )}
                  {renderError("resumeFile")}
                </div>

                {/* How did you hear about us? (Required) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    How did you hear about us? <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    value={source}
                    onChange={(val) => {
                      setSource(val);
                      clearError("source");
                      if (val !== "Other") setOtherSource("");
                      if (val !== "Employee Referral") setReferrerName("");
                    }}
                    hasError={!!errors.source}
                    disabled={isSubmitting}
                    required
                    placeholder="Select an option..."
                    options={[
                      { value: "LinkedIn", label: "LinkedIn" },
                      { value: "Employee Referral", label: "Employee Referral" },
                      { value: "Job Board", label: "Job Board" },
                      { value: "Company Website", label: "Company Website" },
                      { value: "Social Media", label: "Social Media" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                  {renderError("source")}

                  {/* Input box when "Employee Referral" is selected */}
                  {source === "Employee Referral" && (
                    <div className="mt-2 flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Referring Employee Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={referrerName}
                        onChange={(e) => {
                          setReferrerName(e.target.value);
                          clearError("referrerName");
                        }}
                        disabled={isSubmitting}
                        required
                        aria-invalid={!!errors.referrerName}
                        className={inputClass(!!errors.referrerName)}
                        placeholder="Enter the employee's name (e.g. John Doe)..."
                      />
                      {renderError("referrerName")}
                    </div>
                  )}

                  {/* Note box when "Other" is selected */}
                  {source === "Other" && (
                    <div className="mt-2 flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Please specify <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={otherSource}
                        onChange={(e) => {
                          setOtherSource(e.target.value);
                          clearError("otherSource");
                        }}
                        disabled={isSubmitting}
                        required
                        aria-invalid={!!errors.otherSource}
                        className={inputClass(!!errors.otherSource)}
                        placeholder="Please specify where you heard about us..."
                      />
                      {renderError("otherSource")}
                    </div>
                  )}
                </div>

                {/* Brief Note */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Brief Note / Why You're a Fit
                    </label>
                    <span className="text-xs font-normal text-gray-400">Optional</span>
                  </div>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-20 font-medium text-sm disabled:opacity-60"
                    placeholder="Briefly describe your relevant enterprise experience..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 mt-2 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-[1.01] active:scale-95 hover:!bg-black disabled:opacity-70 disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <LandingPageFooter />
    </div>
  );
}
