"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import Image from "next/image";
import { LinkedinIcon, User2Icon, X } from "lucide-react";
import banner from "@/assets/company/leadership-team/banner.webp"

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { linkedin?: string; twitter?: string; mail?: string };
}

export default function TeamClient() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/team`)
      .then((res) => res.json())
      .then((json) => {
        const members = Array.isArray(json?.members) ? json.members : [];
        const mapped: TeamMember[] = members.map((m: {
            id: string;
            name: string;
            role: string;
            bio: string;
            imageUrl: string;
            linkedinUrl?: string | null;
            twitterUrl?: string | null;
            mailTo?: string | null;
          }) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            bio: m.bio,
            image: m.imageUrl,
            socials: { linkedin: m.linkedinUrl, twitter: m.twitterUrl, mail: m.mailTo },
          }));
          setTeamMembers(mapped);
      })
      .catch(console.error);
  }, []);

  const closeModal = () => setSelectedMember(null);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMember]);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <Header visible={true} />

      {/* Hero Section */}
      <PageHero
        title="Our Team"
        backgroundImage={banner.src}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">

        {/* Title Header */}
        <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-gray-900  mb-4 md:mb-6">
            Leadership <span className="text-primary font-bold">Team</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-2 max-w-4xl mx-auto">
            Built across enterprise operations, finance, customer ecosystems, and execution environments, the leadership behind The Vertical AI brings deep experience from industries where scale, coordination, and operational reliability are critical. We’re focused on building AI-native systems that enterprises can operationalize in real-world environments - not just experiment with.
          </p>
        </div>

        {/* Image Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-200 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <Image
                fill
                src={member.image}
                alt={member.name}
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

              {/* Top Icons */}
              <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={member.socials.linkedin} className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors border border-white/20">
                  <LinkedinIcon size={18} strokeWidth={2.5} />
                </a>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors border border-white/20">
                  <User2Icon size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-1 leading-tight drop-shadow-md">{member.name}</h3>
                <p className="text-xs font-medium text-gray-300 drop-shadow-md">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 py-6 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh]"
              >
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center text-gray-800 transition-colors shadow-sm"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>

                {/* Content */}
                <div className="p-6 md:p-12 flex flex-col overflow-y-auto w-full">
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 mb-6 sm:mb-8 items-start sm:items-center">
                    <div className="relative w-24 h-24 sm:w-48 sm:h-48 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                      <Image
                        fill
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 pr-10">{selectedMember.name}</h3>
                      <p className="text-primary font-semibold text-base md:text-lg mb-3 md:mb-4">{selectedMember.role}</p>
                      <div className="flex gap-3">
                        <a href={selectedMember.socials.linkedin} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors">
                          <LinkedinIcon size={18} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-sm md:text-base">
                    {selectedMember.bio.trim().split(/\n\s*\n/).map((para, i, arr) => (
                      <p key={i} className={`mb-6 ${i === arr.length - 1 ? 'font-bold text-gray-900' : ''}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <LandingPageFooter />
    </div>
  );
}
