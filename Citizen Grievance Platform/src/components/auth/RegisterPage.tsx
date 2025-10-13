import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuthService } from "../../lib/auth";
import { User } from "../../types";
import {
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { validateNationalId } from "../../lib/utils";

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onBack: () => void;
}

export function RegisterPage({
  onRegister,
  onBack,
}: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const verifyNationalId = () => {
    if (!formData.nationalId) {
      setError("Please enter your National ID");
      return;
    }

    if (!validateNationalId(formData.nationalId)) {
      setError(
        "Invalid National ID format. Use format: NID-XXXXXXXXX",
      );
      return;
    }

    // Mock verification - in production, this would call a government API
    setIdVerified(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!idVerified) {
      setError("Please verify your National ID first");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const user = await AuthService.register({
        name: formData.name,
        email: formData.email,
        nationalId: formData.nationalId,
        password: formData.password,
      });

      if (user) {
        onRegister(user);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        "Registration failed. This email or National ID may already be registered.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>

        {/* Official Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border-t-4 border-[#FF9933]">
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fnational-emblem-of-india&psig=AOvVaw0CoeLWYgc7qD8I-yAYIX9w&ust=1760467650047000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLD695vroZADFQAAAAAdAAAAABAJ"
              alt="National Emblem"
              className="h-16 w-16 object-contain"
            />
            <div className="text-center">
              <h2 className="text-xl text-[#000080]">
                National Grievance & Appeals Portal
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] my-2"></div>
              <p className="text-sm text-gray-600">
                Citizen Registration
              </p>
            </div>
          </div>
        </div>

        <Card className="border-l-4 border-l-[#138808] shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white">
            <CardTitle className="text-[#000080]">
              Citizen Registration
            </CardTitle>
            <CardDescription>
              Register with your National ID to submit
              grievances and track appeals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* National ID Verification */}
              <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="nationalId">
                    National ID Verification
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="nationalId"
                    name="nationalId"
                    type="text"
                    placeholder="NID-XXXXXXXXX"
                    value={formData.nationalId}
                    onChange={handleChange}
                    disabled={idVerified}
                    required
                  />
                  {!idVerified ? (
                    <Button
                      type="button"
                      onClick={verifyNationalId}
                    >
                      Verify
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      disabled
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      Verified
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Format: NID-123456789 (for demo purposes)
                </p>
              </div>

              {/* Personal Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !idVerified}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <div className="text-sm text-gray-600 space-y-2 pt-4 border-t">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  National ID verification ensures secure,
                  authentic user registration
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  All your submissions are tracked with complete
                  transparency
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  SLA-based automatic escalation ensures
                  accountability
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}