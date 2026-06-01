import { useState, useEffect } from "react";
import type { Agent, FormState, FormErrors, Role } from "@/types";
import { DEFAULT_FORM, COUNTRIES } from "@/data/constants";
import { IconInput }    from "@/components/ui/IconInput";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Toggle }       from "@/components/ui/Toggle";
import {
  IconUser, IconMail, IconPhone, IconLock,
  IconClose, IconCheck, IconEye, IconEyeOff,
} from "@/components/icons";

interface AgentModalProps {
  isOpen:     boolean;
  onClose:    () => void;
  editAgent:  Agent | null;
  onSave:     (form: FormState) => void;
}

function validatePhone(phone: string, countryCode: string): string | undefined {
  if (!phone.trim()) return "Phone number is required";

  // Strip spaces, dashes, dots, parentheses — keep only digits
  const digitsOnly = phone.replace(/[\s\-().]/g, "");

  if (!/^\d+$/.test(digitsOnly))
    return "Phone must contain only digits (spaces/dashes allowed)";

  const country = COUNTRIES.find((c) => c.code === countryCode);
  if (country) {
    if (digitsOnly.length < country.minDigits || digitsOnly.length > country.maxDigits) {
      return country.minDigits === country.maxDigits
        ? `${country.name} numbers must be exactly ${country.minDigits} digits`
        : `${country.name} numbers must be ${country.minDigits}–${country.maxDigits} digits`;
    }
  }

  return undefined;
}

function validate(form: FormState, isEdit: boolean): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())              errors.name     = "Full name is required";
  if (!form.email.trim())             errors.email    = "Email is required";
  else if (!form.email.includes("@")) errors.email    = "Enter a valid email address";

  const phoneErr = validatePhone(form.phone, form.country);
  if (phoneErr)                       errors.phone    = phoneErr;

  if (!form.username.trim())          errors.username = "Username is required";

  if (!isEdit) {
    if (!form.password)               errors.password = "Password is required";
    else if (form.password.length < 6) errors.password = "Minimum 6 characters";
    if (form.password !== form.confirmPassword)
                                      errors.confirmPassword = "Passwords don't match";
  }
  return errors;
}

export function AgentModal({ isOpen, onClose, editAgent, onSave }: AgentModalProps) {
  const [form, setForm]       = useState<FormState>({ ...DEFAULT_FORM });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [showPass, setShowPass] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editAgent) {
      let countryCode = "+91";
      let phoneNum = editAgent.phone;
      for (const c of COUNTRIES) {
        if (editAgent.phone.startsWith(c.code)) {
          countryCode = c.code;
          phoneNum = editAgent.phone.slice(c.code.length).trim();
          break;
        }
      }

      setForm({
        name:            editAgent.name,
        email:           editAgent.email,
        phone:           phoneNum,
        country:         countryCode,
        role:            editAgent.role,
        username:        editAgent.username,
        password:        "",
        confirmPassword: "",
        active:          editAgent.status === "Active",
      });
    } else {
      setForm({ ...DEFAULT_FORM });
    }
    setErrors({});
    setShowPass(false);
  }, [editAgent, isOpen]);

  if (!isOpen) return null;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSave() {
    const errs = validate(form, !!editAgent);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSave(form);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(12px) saturate(150%)",
        WebkitBackdropFilter: "blur(12px) saturate(150%)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg max-h-[88vh] overflow-hidden rounded-3xl flex flex-col animate-slide-up"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5) inset",
          border: "1px solid rgba(226, 232, 240, 0.5)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-100/80">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {editAgent ? "Edit Team Member" : "Create New Team Member"}
            </h2>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
              {editAgent ? "Update Account Details" : "Register a new profile"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors ml-4 flex-shrink-0"
          >
            <IconClose size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1">
          {/* Basic Info */}
          <section className="flex flex-col gap-3">
            <SectionLabel>Basic Info</SectionLabel>
            <div className="bg-slate-50/60 rounded-2xl p-4 flex flex-col gap-3 border border-slate-100/60">
              <IconInput
                icon={<IconUser />}
                placeholder="Full Name"
                value={form.name}
                onChange={(v) => { set("name", v); setErrors((p) => ({ ...p, name: undefined })); }}
                error={errors.name}
              />
              <IconInput
                icon={<IconMail />}
                placeholder="Email Address"
                value={form.email}
                onChange={(v) => { set("email", v); setErrors((p) => ({ ...p, email: undefined })); }}
                error={errors.email}
              />
              
              {/* Phone input with country selector */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <div className="relative flex-shrink-0">
                    <select
                      value={form.country}
                      onChange={(e) => {
                        set("country", e.target.value);
                        // Re-validate immediately when country changes
                        setErrors((prev) => ({ ...prev, phone: validatePhone(form.phone, e.target.value) }));
                      }}
                      className="pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 cursor-pointer appearance-none focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>

                  <IconInput
                    icon={<IconPhone />}
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(v) => {
                      set("phone", v);
                      // Re-validate live so error clears as soon as input is valid
                      setErrors((p) => ({ ...p, phone: validatePhone(v, form.country) }));
                    }}
                    error={errors.phone}
                  />
                </div>

                {/* Country-aware format hint */}
                {(() => {
                  const c = COUNTRIES.find((x) => x.code === form.country);
                  if (!c) return null;
                  const digits = c.minDigits === c.maxDigits ? `${c.minDigits}` : `${c.minDigits}–${c.maxDigits}`;
                  return (
                    <p className="text-[11px] font-medium text-slate-400 pl-1">
                      {c.flag} {c.name} · {digits} digits expected after {c.code}
                    </p>
                  );
                })()}
              </div>
            </div>
          </section>

          {/* Role Choice */}
          <section className="flex flex-col gap-3">
            <SectionLabel>Professional Assignment</SectionLabel>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {(["Agent", "Manager"] as Role[]).map((r) => {
                  const selected = form.role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => set("role", r)}
                      className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all duration-200 text-left ${
                        selected
                          ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                          : "border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
                      }`}
                    >
                      <span className="text-2xl">{r === "Agent" ? "👤" : "👨‍💼"}</span>
                      <div className="flex-1">
                        <p className={`font-bold text-sm leading-snug ${selected ? "text-indigo-800" : "text-slate-700"}`}>
                          {r}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase mt-0.5">
                          {r === "Agent" ? "Staff Member" : "Lead Manager"}
                        </p>
                      </div>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 animate-scale-in">
                          <IconCheck size={10} color="#fff" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Login Details */}
          <section className="flex flex-col gap-3">
            <SectionLabel>Login Details</SectionLabel>
            <div className="bg-slate-50/60 rounded-2xl p-4 flex flex-col gap-3 border border-slate-100/60">
              <IconInput
                icon={<IconUser />}
                placeholder="Username"
                value={form.username}
                onChange={(v) => { set("username", v); setErrors((p) => ({ ...p, username: undefined })); }}
                error={errors.username}
              />
              
              {/* Show Password fields only during creation */}
              {!editAgent && (
                <>
                  <IconInput
                    icon={<IconLock />}
                    placeholder="Password"
                    value={form.password}
                    onChange={(v) => { set("password", v); setErrors((p) => ({ ...p, password: undefined, confirmPassword: undefined })); }}
                    type={showPass ? "text" : "password"}
                    error={errors.password}
                    rightSlot={
                      <button
                        type="button"
                        onClick={() => setShowPass((p) => !p)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPass ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                      </button>
                    }
                  />
                  <IconInput
                    icon={<IconLock />}
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={(v) => { set("confirmPassword", v); setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                    type="password"
                    error={errors.confirmPassword}
                  />
                </>
              )}
            </div>
          </section>

          {/* Additional details */}
          <section className="flex flex-col gap-3.5">
            <SectionLabel>Additional Configuration</SectionLabel>
            <div className="bg-slate-50/60 rounded-2xl p-4 flex flex-col gap-3 border border-slate-100/60">
              <Toggle
                checked={form.active}
                onChange={(v) => set("active", v)}
                label="Active Status"
                description="Toggle whether this member has system access"
              />
              

            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div
          className="flex gap-3 p-6 border-t border-slate-100/80 flex-shrink-0"
          style={{ background: "rgba(248, 250, 252, 0.6)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all duration-150 hover:shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-[2] py-2.5 rounded-md border-none text-sm font-bold text-white transition-all duration-200 hover:bg-[#173b3e] bg-[#0A474C] active:scale-[0.98] shadow-sm"
          >
            {editAgent ? "Save Changes" : "Create Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
