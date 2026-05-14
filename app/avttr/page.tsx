"use client"

import { useState, useEffect, useRef } from "react"
import { supabase, safeLogout } from "@/lib/supabase"
import type { Project } from "@/lib/types"
import TargetCursor from "@/components/TargetCursor"
import { Plus, Settings, Wrench, Edit, Trash2, Save, X, Loader2, Upload, LogOut, MonitorCog, Palette, SquarePen, Scissors, FilePenLine, GripVertical, Hand, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import Image from "next/image"
import { toast } from "sonner"

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url")
  const [imagePreview, setImagePreview] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    github: "",
    figma: "",
    website: "",
    color: "from-blue-500/20 to-purple-500/20",
    category: ["project"],
  })

  useEffect(() => {
    checkAuth()
    fetchProjects()

    // Entrance animation for when page loads
    const timer = setTimeout(() => {
      // Animate header (select by class since we can't use ref directly in query selector)
      const headerElement = document.querySelector('.admin-header');
      if (headerElement) {
        gsap.fromTo(headerElement,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
        );
      }

      // Animate the project cards
      const projectCards = document.querySelectorAll('[key*="project"]');
      projectCards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3, stagger: 0.1 }
        );
      });
    }, 150); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
    };
  }, [])

  async function checkAuth() {
    try {
      if (!supabase) {
        console.error("Supabase is not initialized. Please check your environment variables.")
        router.push("/login")
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Auth check error:", error)
      router.push("/login")
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      const { success, error } = await safeLogout()

      if (!success) {
        throw error || new Error("Logout failed")
      }

      setProjects([])
      setEditingProject(null)
      setIsFormOpen(false)

      await new Promise(resolve => setTimeout(resolve, 500))

      router.push("/login?logout=true")

      setTimeout(() => {
        window.location.href = "/login"
      }, 1000)
    } catch (error) {
      console.error("Error logging out:", error)
      const errorMsg = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Error logging out: ${errorMsg}`)
      setIsLoggingOut(false)
    }
  }

  async function fetchProjects() {
    try {
      if (!supabase) {
        console.error("Supabase is not initialized")
        return
      }
      setLoading(true)
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false })

      if (error) throw error
      if (data) setProjects(data)
    } catch (error: any) {
      console.error("Error fetching projects:", error)
      toast.error(`Error fetching projects: ${error.message || JSON.stringify(error, null, 2)}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!supabase) {
      toast.error("Supabase is not initialized. Please check your configuration.")
      return
    }

    try {
      if (editingProject?.id) {
        const { error } = await supabase
          .from("projects")
          .update(formData)
          .eq("id", editingProject.id)

        if (error) throw error
        toast.success("Project updated successfully!")
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([formData])

        if (error) throw error
        toast.success("Project created successfully!")
      }

      closeForm()
      fetchProjects()
    } catch (error) {
      console.error("Error saving project:", error)
      toast.error("Error saving project")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return

    if (!supabase) {
      toast.error("Supabase is not initialized. Please check your configuration.")
      return
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id)
      if (error) throw error
      setProjects(projects.filter((p) => p.id !== id))
      toast.success("Project deleted successfully!")
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Error deleting project")
    }
  }

  function openEdit(project: Project) {
    setEditingProject(project)
    setFormData(project)
    setImagePreview(project.image)
    setIsFormOpen(true)
    setUploadMode(
      project.image.startsWith("http") && project.image.includes("supabase")
        ? "file"
        : "url"
    )
  }

  function openCreate() {
    setEditingProject(null)
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: [],
      github: "",
      figma: "",
      website: "",
      color: "from-blue-500/20 to-purple-500/20",
      category: ["project"],
    })
    setImagePreview("")
    setIsFormOpen(true)
    setUploadMode("url")
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingProject(null)
    setImagePreview("")
  }

  function handleTechChange(e: React.ChangeEvent<HTMLInputElement>) {
    const techs = e.target.value.split(",").map((t) => t.trim())
    setFormData({ ...formData, technologies: techs })
  }

  function toggleCategory(cat: "project" | "playgrounds") {
    const current = [...formData.category]
    if (current.includes(cat)) {
      setFormData({ ...formData, category: current.filter((c) => c !== cat) })
    } else {
      setFormData({ ...formData, category: [...current, cat] })
    }
  }

  async function uploadImageFile(file: File) {
    if (!supabase) {
      toast.error("Supabase is not initialized. Please check your configuration.")
      return
    }

    const fileExt = file.name.split(".").pop() || "png"
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    setIsUploading(true)
    try {
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(filePath)

      if (data?.publicUrl) {
        setFormData(prev => ({ ...prev, image: data.publicUrl }))
        setImagePreview(data.publicUrl)
        setUploadMode("file")
        toast.success("Image uploaded successfully!")
      } else {
        throw new Error("Could not get public URL for uploaded image")
      }
    } catch (error: any) {
      toast.error(`Error uploading image: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    await uploadImageFile(e.target.files[0])
  }

  async function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile()
        if (file) {
          e.preventDefault()
          await uploadImageFile(file)
          break
        }
      }
    }
  }

  return (
    <div className="min-h-screen text-white p-8 relative overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Bran-KunWIFEHD.png"
          alt="Dashboard Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="blur-sm"
        />
        {/* Overlay to adjust contrast if needed */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 admin-header">
          <h1 className="text-3xl font-bold">Admin Datang! </h1>
          <button
            onClick={openCreate}
            className="cursor-target flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin w-10 h-10 text-amber-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#232325] border border-white/5 rounded-xl overflow-hidden group cursor-target relative"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Draft Badge */}
                  {project.is_draft && (
                    <div className="absolute top-3 left-3 bg-gray-900/90 text-amber-500 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-500/50 backdrop-blur-md shadow-lg flex items-center gap-1.5 z-10 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <Lock size={10} className="text-amber-500" />
                      Draft
                    </div>
                  )}
                  {/* Edit and Delete buttons in top-right corner (stacked vertically) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => openEdit(project)}
                      className="p-2.5 bg-linear-to-r from-amber-500 to-orange-500 rounded-full text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-amber-500/40 flex items-center justify-center min-w-[36px] min-h-[36px] hover:rotate-6"
                      title="Edit project"
                    >
                      <div className="relative w-6 h-6 overflow-hidden rounded-full group-hover:scale-110 transition-transform">
                        <Image
                          src="/edit-icon.png"
                          alt="Edit"
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                    </button>
                    <button
                      onClick={() => project.id && handleDelete(project.id)}
                      className="p-2.5 bg-linear-to-r from-red-500 to-rose-500 rounded-full text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-red-500/40 flex items-center justify-center min-w-[36px] min-h-[36px] hover:-rotate-6"
                      title="Delete project"
                    >
                      <div className="relative w-6 h-6 overflow-hidden rounded-full group-hover:scale-110 transition-transform">
                        <Image
                          src="/delete-icon.jpg"
                          alt="Delete"
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#232325] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto md:mx-4">
              <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#232325] z-10">
                <h2 className="text-xl font-bold">
                  {editingProject ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} onPaste={handlePaste} className="p-4 sm:p-6 space-y-4">
                {/* Image Preview with Blur Background */}
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 border border-white/10 group">
                    <div
                      className="absolute inset-0 blur-md"
                      style={{
                        backgroundImage: `url('${imagePreview}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="relative w-full h-full object-contain"
                    />
                    {/* Delete Image Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setFormData({ ...formData, image: "" });
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-20 flex items-center justify-center hover:scale-110 active:scale-95"
                      title="Clear Image"
                    >
                      <div className="relative w-6 h-6 overflow-hidden rounded-full">
                        <Image 
                          src="/delete-icon.jpg" 
                          alt="Delete" 
                          width={24} 
                          height={24} 
                          className="object-cover"
                        />
                      </div>
                    </button>
                  </div>
                )}

                {/* Title & Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Image Source
                    </label>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setUploadMode("url")}
                        className={`px-3 py-1.5 rounded text-xs ${
                          uploadMode === "url"
                            ? "bg-amber-500 text-black"
                            : "bg-white/10"
                        }`}
                      >
                        URL Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMode("file")}
                        className={`px-3 py-1.5 rounded text-xs ${
                          uploadMode === "file"
                            ? "bg-amber-500 text-black"
                            : "bg-white/10"
                        }`}
                      >
                        Upload File
                      </button>
                    </div>

                    {uploadMode === "url" ? (
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value })
                          setImagePreview(e.target.value)
                        }}
                        placeholder="https://..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none"
                      />
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center w-full p-3 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5"
                        >
                          {isUploading ? (
                            <Loader2 className="animate-spin text-amber-500" />
                          ) : (
                            <span className="text-sm text-gray-400 flex items-center gap-2">
                              <Upload size={16} /> Choose File
                            </span>
                          )}
                        </label>
                        {formData.image &&
                          formData.image.includes("supabase") && (
                            <p className="text-xs text-green-500 mt-1 truncate">
                              Image uploaded!
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none h-24"
                    required
                  />
                </div>

                {/* Technologies & Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.technologies.join(", ")}
                      onChange={handleTechChange}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["project", "playgrounds"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() =>
                            toggleCategory(cat as "project" | "playgrounds")
                          }
                          className={`
                            px-3 py-1.5 rounded-full text-xs border transition-colors
                            ${
                              formData.category.includes(
                                cat as "project" | "playgrounds"
                              )
                                ? "bg-amber-500 border-amber-500 text-black font-bold"
                                : "bg-transparent border-white/20 text-gray-400 hover:border-white"
                            }
                          `}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Github URL
                    </label>
                    <input
                      type="text"
                      value={formData.github || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      placeholder="Optional"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Figma URL
                    </label>
                    <input
                      type="text"
                      value={formData.figma || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, figma: e.target.value })
                      }
                      placeholder="Optional"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={formData.website || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      placeholder="Optional"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Draft Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Save as Draft</h4>
                    <p className="text-xs text-gray-400">Hide this project from the main portfolio page.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.is_draft || false}
                      onChange={(e) => setFormData({ ...formData, is_draft: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-white/10 mt-4 sm:mt-0 sm:pt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-7 py-2.5 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    {isUploading ? "Uploading..." : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      </div>

      {/* Floating Logout Button */}
      <div className="fixed bottom-8 right-8 z-40 cursor-target">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="group bg-[#232325] hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-500 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-0 hover:gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          title={isLoggingOut ? "Logging out..." : "Logout"}
        >
          <LogOut size={20} />
          <span className="max-w-0 group-hover:max-w-[100px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium text-sm">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  )
}