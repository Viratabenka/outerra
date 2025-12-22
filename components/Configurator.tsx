"use client";

import { useState } from "react";

interface KitchenModel {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
}

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
}

interface Material {
  id: string;
  name: string;
  description: string;
  color: string;
  price: number;
}

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<KitchenModel | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const models: KitchenModel[] = [
    {
      id: 1,
      name: "Classic Series",
      description: "Timeless elegance with traditional design elements",
      price: 8999,
      features: ["Stainless steel construction", "Built-in grill", "Prep station"],
    },
    {
      id: 2,
      name: "Modern Series",
      description: "Sleek contemporary design with cutting-edge features",
      price: 12999,
      features: ["Premium finishes", "Smart technology", "Modular design"],
    },
    {
      id: 3,
      name: "Luxury Series",
      description: "Ultimate sophistication with custom luxury options",
      price: 19999,
      features: ["Custom materials", "Professional-grade appliances", "Full customization"],
    },
  ];

  const modules: Module[] = [
    {
      id: "grill",
      name: "Built-in Grill",
      description: "Professional-grade gas grill with side burners",
      icon: "🔥",
      price: 2499,
    },
    {
      id: "sink",
      name: "Stainless Steel Sink",
      description: "Weather-resistant sink with faucet",
      icon: "💧",
      price: 899,
    },
    {
      id: "storage",
      name: "Storage Cabinets",
      description: "Spacious storage with weatherproof doors",
      icon: "📦",
      price: 1299,
    },
    {
      id: "prep",
      name: "Prep Station",
      description: "Large work surface for food preparation",
      icon: "🔪",
      price: 799,
    },
    {
      id: "refrigerator",
      name: "Outdoor Refrigerator",
      description: "Weather-resistant refrigeration unit",
      icon: "❄️",
      price: 1899,
    },
    {
      id: "drawers",
      name: "Drawer System",
      description: "Smooth-gliding drawer storage",
      icon: "🗄️",
      price: 599,
    },
  ];

  const materials: Material[] = [
    {
      id: "stainless-steel",
      name: "Stainless Steel",
      description: "Durable and easy to maintain",
      color: "#C0C0C0",
      price: 0,
    },
    {
      id: "teak-wood",
      name: "Teak Wood",
      description: "Premium weather-resistant hardwood",
      color: "#8B4513",
      price: 1500,
    },
    {
      id: "composite",
      name: "Composite",
      description: "Modern composite material",
      color: "#2F4F4F",
      price: 800,
    },
    {
      id: "stone",
      name: "Natural Stone",
      description: "Elegant natural stone finish",
      color: "#696969",
      price: 2200,
    },
    {
      id: "powder-coated",
      name: "Powder Coated",
      description: "Custom color powder coating",
      color: "#4682B4",
      price: 600,
    },
  ];

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleMaterialSelect = (materialId: string, category: string) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [category]: materialId,
    }));
  };

  const calculateTotal = () => {
    let total = selectedModel?.price || 0;
    selectedModules.forEach((moduleId) => {
      const module = modules.find((m) => m.id === moduleId);
      if (module) total += module.price;
    });
    Object.values(selectedMaterials).forEach((materialId) => {
      const material = materials.find((m) => m.id === materialId);
      if (material) total += material.price;
    });
    return total;
  };

  const getSelectedModuleNames = () => {
    return selectedModules
      .map((id) => modules.find((m) => m.id === id)?.name)
      .filter(Boolean);
  };

  const getSelectedMaterialNames = () => {
    return Object.entries(selectedMaterials).map(([category, materialId]) => {
      const material = materials.find((m) => m.id === materialId);
      return { category, name: material?.name || "Not selected" };
    });
  };

  const canProceedToNextStep = () => {
    if (currentStep === 1) return selectedModel !== null;
    if (currentStep === 2) return selectedModules.length > 0;
    if (currentStep === 3) return Object.keys(selectedMaterials).length > 0;
    if (currentStep === 4) return false; // Form step
    return false;
  };

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateConfigurationSummary = () => {
    let summary = "Kitchen Configuration Summary:\n\n";
    
    if (selectedModel) {
      summary += `Model: ${selectedModel.name}\n`;
      summary += `Description: ${selectedModel.description}\n`;
      summary += `Base Price: $${selectedModel.price.toLocaleString()}\n\n`;
    }

    if (selectedModules.length > 0) {
      summary += "Selected Modules:\n";
      selectedModules.forEach((moduleId) => {
        const module = modules.find((m) => m.id === moduleId);
        if (module) {
          summary += `- ${module.name}: $${module.price.toLocaleString()}\n`;
        }
      });
      summary += "\n";
    }

    if (Object.keys(selectedMaterials).length > 0) {
      summary += "Selected Materials:\n";
      Object.entries(selectedMaterials).forEach(([category, materialId]) => {
        const material = materials.find((m) => m.id === materialId);
        if (material) {
          summary += `- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${material.name}`;
          if (material.price > 0) {
            summary += ` (+$${material.price.toLocaleString()})`;
          }
          summary += "\n";
        }
      });
      summary += "\n";
    }

    summary += `Total Estimated Price: $${calculateTotal().toLocaleString()}`;
    return summary;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const configurationSummary = generateConfigurationSummary();
    
    const submissionData = {
      name: formData.name,
      email: formData.email,
      configuration: {
        model: selectedModel,
        modules: selectedModules.map((id) => modules.find((m) => m.id === id)),
        materials: Object.entries(selectedMaterials).map(([category, materialId]) => ({
          category,
          material: materials.find((m) => m.id === materialId),
        })),
        totalPrice: calculateTotal(),
      },
      configurationSummary,
    };

    // Simulate API call - Replace with actual API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      console.log("Quote Request Submission:", submissionData);
      
      // Here you would typically send to your API:
      // await fetch('/api/quote-request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submissionData),
      // });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="configurator" className="py-24 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Kitchen Configurator
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Design your perfect outdoor kitchen in three simple steps
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                      currentStep >= step
                        ? "bg-primary-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= step ? "text-primary-600" : "text-gray-500"
                    }`}
                  >
                    {step === 1 && "Model"}
                    {step === 2 && "Modules"}
                    {step === 3 && "Materials"}
                    {step === 4 && "Quote"}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-2 md:mx-4 transition-all duration-200 ${
                      currentStep > step ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Configuration Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Step 1: Select Kitchen Model */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    Step 1: Choose Your Kitchen Model
                  </h3>
                  <div className="space-y-4">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model)}
                        className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                          selectedModel?.id === model.id
                            ? "border-primary-600 bg-primary-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">
                              {model.name}
                            </h4>
                            <p className="text-gray-600 mb-4">{model.description}</p>
                            <ul className="space-y-2 mb-4">
                              {model.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                  <svg
                                    className="w-4 h-4 text-primary-600 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <p className="text-lg font-bold text-primary-600">
                              ${model.price.toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedModel?.id === model.id
                                ? "border-primary-600 bg-primary-600"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedModel?.id === model.id && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Layout/Modules */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    Step 2: Select Your Modules
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose the modules you want to include in your outdoor kitchen
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {modules.map((module) => {
                      const isSelected = selectedModules.includes(module.id);
                      return (
                        <button
                          key={module.id}
                          onClick={() => handleModuleToggle(module.id)}
                          className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                            isSelected
                              ? "border-primary-600 bg-primary-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="text-3xl mr-3">{module.icon}</span>
                                <h4 className="text-lg font-bold text-gray-900">
                                  {module.name}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                              <p className="text-base font-semibold text-primary-600">
                                +${module.price.toLocaleString()}
                              </p>
                            </div>
                            <div
                              className={`ml-4 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "border-primary-600 bg-primary-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Request Quote Form */}
              {currentStep === 4 && (
                <div>
                  {!isSubmitted ? (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        Request Your Quote
                      </h3>
                      <p className="text-gray-600 mb-8">
                        Fill in your details and we'll send you a personalized quote for your
                        configured outdoor kitchen.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-200"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-200"
                            placeholder="john@example.com"
                          />
                        </div>

                        {/* Configuration Summary Preview */}
                        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                          <h4 className="text-lg font-bold text-gray-900 mb-4">
                            Your Configuration
                          </h4>
                          <div className="space-y-3 text-sm">
                            {selectedModel && (
                              <div>
                                <p className="font-semibold text-gray-700">Model:</p>
                                <p className="text-gray-600">
                                  {selectedModel.name} - ${selectedModel.price.toLocaleString()}
                                </p>
                              </div>
                            )}
                            {selectedModules.length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-700">
                                  Modules ({selectedModules.length}):
                                </p>
                                <ul className="list-disc list-inside text-gray-600 ml-2">
                                  {selectedModules.map((moduleId) => {
                                    const module = modules.find((m) => m.id === moduleId);
                                    return module ? (
                                      <li key={moduleId}>
                                        {module.name} (+${module.price.toLocaleString()})
                                      </li>
                                    ) : null;
                                  })}
                                </ul>
                              </div>
                            )}
                            {Object.keys(selectedMaterials).length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-700">Materials:</p>
                                <ul className="list-disc list-inside text-gray-600 ml-2">
                                  {Object.entries(selectedMaterials).map(([category, materialId]) => {
                                    const material = materials.find((m) => m.id === materialId);
                                    return material ? (
                                      <li key={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}:{" "}
                                        {material.name}
                                        {material.price > 0 && ` (+$${material.price.toLocaleString()})`}
                                      </li>
                                    ) : null;
                                  })}
                                </ul>
                              </div>
                            )}
                            <div className="pt-3 border-t border-gray-300">
                              <p className="font-bold text-lg text-primary-600">
                                Total: ${calculateTotal().toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting || !formData.name || !formData.email}
                            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                              isSubmitting || !formData.name || !formData.email
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl"
                            }`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Submitting...
                              </span>
                            ) : (
                              "Submit Quote Request"
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                          className="w-12 h-12 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Your quote request has been submitted successfully.
                      </p>
                      <p className="text-gray-600 mb-8">
                        We'll review your configuration and get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setCurrentStep(1);
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "" });
                        }}
                        className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                      >
                        Configure Another Kitchen
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Select Materials */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    Step 3: Choose Your Materials
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select material finishes for different parts of your kitchen
                  </p>
                  <div className="space-y-6">
                    {["Cabinets", "Countertop", "Accents"].map((category) => {
                      const selectedMaterialId = selectedMaterials[category.toLowerCase()];
                      return (
                        <div key={category} className="border-b border-gray-200 pb-6 last:border-0">
                          <h4 className="text-lg font-bold text-gray-900 mb-4">{category}</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {materials.map((material) => {
                              const isSelected = selectedMaterialId === material.id;
                              return (
                                <button
                                  key={material.id}
                                  onClick={() =>
                                    handleMaterialSelect(material.id, category.toLowerCase())
                                  }
                                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                    isSelected
                                      ? "border-primary-600 bg-primary-50 shadow-lg"
                                      : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div
                                        className="w-12 h-12 rounded-lg mr-4 border-2 border-gray-200"
                                        style={{ backgroundColor: material.color }}
                                      />
                                      <div>
                                        <h5 className="font-bold text-gray-900">
                                          {material.name}
                                        </h5>
                                        <p className="text-sm text-gray-600">
                                          {material.description}
                                        </p>
                                        {material.price > 0 && (
                                          <p className="text-sm font-semibold text-primary-600 mt-1">
                                            +${material.price.toLocaleString()}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`ml-4 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                        isSelected
                                          ? "border-primary-600 bg-primary-600"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {isSelected && (
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceedToNextStep()}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                    canProceedToNextStep()
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentStep === 3 ? "Request Quote" : "Next Step"}
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                Configuration Summary
              </h3>

              <div className="space-y-6">
                {/* Selected Model */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Model</h4>
                  {selectedModel ? (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900">{selectedModel.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedModel.description}</p>
                      <p className="text-primary-600 font-bold mt-2">
                        ${selectedModel.price.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Not selected</p>
                  )}
                </div>

                {/* Selected Modules */}
                {currentStep >= 2 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Modules ({selectedModules.length})
                    </h4>
                    {selectedModules.length > 0 ? (
                      <div className="space-y-2">
                        {selectedModules.map((moduleId) => {
                          const module = modules.find((m) => m.id === moduleId);
                          if (!module) return null;
                          return (
                            <div key={moduleId} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-gray-900 text-sm">
                                    {module.name}
                                  </p>
                                </div>
                                <p className="text-primary-600 font-bold text-sm">
                                  +${module.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No modules selected</p>
                    )}
                  </div>
                )}

                {/* Selected Materials */}
                {currentStep >= 3 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Materials
                    </h4>
                    {Object.keys(selectedMaterials).length > 0 ? (
                      <div className="space-y-2">
                        {Object.entries(selectedMaterials).map(([category, materialId]) => {
                          const material = materials.find((m) => m.id === materialId);
                          if (!material) return null;
                          return (
                            <div key={category} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-gray-500 capitalize">{category}</p>
                                  <p className="font-semibold text-gray-900 text-sm">
                                    {material.name}
                                  </p>
                                </div>
                                {material.price > 0 && (
                                  <p className="text-primary-600 font-bold text-sm">
                                    +${material.price.toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No materials selected</p>
                    )}
                  </div>
                )}

                {/* Total Price */}
                <div className="pt-6 border-t-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Final price may vary based on installation
                  </p>
                </div>

                {/* Action Button */}
                {currentStep === 3 && selectedModel && (
                  <button
                    onClick={handleNext}
                    disabled={!canProceedToNextStep()}
                    className={`w-full mt-4 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      canProceedToNextStep()
                        ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Request Quote
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
