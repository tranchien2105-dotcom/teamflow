"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
    createEducation,
    getSchools,
    updateEducation,
    type Education,
    type School,
} from "@/services/education-service";

interface EducationFormProps {
    open: boolean;
    education: Education | null;
    onClose: () => void;
    onSuccess: () => void;
}

type FormData = {
    school_id: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    description: string;
};

const emptyForm: FormData = {
    school_id: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    description: "",
};

const degrees = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "Diploma",
    "Certificate",
];

const fieldsOfStudy = [
    "Computer Science",
    "Computer Networks",
    "Software Engineering",
    "Information Technology",
    "Information Systems",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Business Administration",
    "Accounting",
    "Finance",
    "Marketing",
    "Economics",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Other",
];

export default function EducationForm({
    open,
    education,
    onClose,
    onSuccess,
}: EducationFormProps) {
    const [form, setForm] =
        useState<FormData>(emptyForm);

    const [schools, setSchools] = useState<School[]>(
        []
    );

    const [schoolSearch, setSchoolSearch] =
        useState("");

    const [showSchoolDropdown, setShowSchoolDropdown] =
        useState(false);

    const [loadingSchools, setLoadingSchools] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const isEdit = Boolean(education);

    /*
     * Load schools when form opens.
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        async function loadSchools() {
            try {
                setLoadingSchools(true);

                const data = await getSchools();

                setSchools(data);
            } catch (error) {
                console.error(
                    "Failed to load schools:",
                    error
                );

                toast.error(
                    "Failed to load schools."
                );
            } finally {
                setLoadingSchools(false);
            }
        }

        loadSchools();
    }, [open]);

    /*
     * Fill form when editing.
     */
    useEffect(() => {
        if (education) {
            setForm({
                school_id:
                    education.school?.id ?? "",
                degree: education.degree ?? "",
                field_of_study:
                    education.field_of_study ?? "",
                start_date:
                    education.start_date ?? "",
                end_date:
                    education.end_date ?? "",
                description:
                    education.description ?? "",
            });

            setSchoolSearch(
                education.school?.name ?? ""
            );
        } else {
            setForm(emptyForm);
            setSchoolSearch("");
        }

        setShowSchoolDropdown(false);
    }, [education, open]);

    /*
     * Filter schools.
     */
    const filteredSchools = useMemo(() => {
        const keyword =
            schoolSearch.trim().toLowerCase();

        if (!keyword) {
            return schools;
        }

        return schools.filter((school) => {
            return (
                school.name
                    .toLowerCase()
                    .includes(keyword) ||
                school.short_name
                    ?.toLowerCase()
                    .includes(keyword) ||
                school.location
                    ?.toLowerCase()
                    .includes(keyword)
            );
        });
    }, [schools, schoolSearch]);

    if (!open) {
        return null;
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSchoolSelect = (
        school: School
    ) => {
        setForm((prev) => ({
            ...prev,
            school_id: school.id,
        }));

        setSchoolSearch(school.name);
        setShowSchoolDropdown(false);
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!form.school_id) {
            toast.error(
                "Please select a school."
            );

            return;
        }

        if (!form.degree) {
            toast.error(
                "Please select a degree."
            );

            return;
        }

        if (!form.field_of_study) {
            toast.error(
                "Please select a field of study."
            );

            return;
        }

        setLoading(true);

        try {
            const payload = {
                school_id: form.school_id,
                degree: form.degree,
                field_of_study:
                    form.field_of_study,
                start_date: form.start_date,
                end_date:
                    form.end_date || undefined,
                description:
                    form.description || undefined,
            };

            if (education) {
                await updateEducation(
                    education.id,
                    payload
                );

                toast.success(
                    "Education updated successfully."
                );
            } else {
                await createEducation(payload);

                toast.success(
                    "Education added successfully."
                );
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error(
                "Failed to save education:",
                error
            );

            toast.error(
                "Failed to save education. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/40 px-4
            "
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div
                className="
                    w-full max-w-2xl
                    rounded-xl
                    bg-white
                    shadow-xl
                "
            >
                {/* Header */}
                <div
                    className="
                        flex items-center
                        justify-between
                        border-b
                        px-6 py-4
                    "
                >
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {isEdit
                                ? "Edit Education"
                                : "Add Education"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {isEdit
                                ? "Update your educational background."
                                : "Add your educational background."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-md
                            p-2
                            text-gray-400
                            hover:bg-gray-100
                            hover:text-gray-600
                            disabled:opacity-50
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div
                        className="
                            max-h-[70vh]
                            space-y-5
                            overflow-y-auto
                            px-6 py-5
                        "
                    >
                        {/* School */}
                        <div>
                            <label
                                htmlFor="school"
                                className="
                                    mb-1.5
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                School
                            </label>

                            <div className="relative">
                                <input
                                    id="school"
                                    type="text"
                                    value={
                                        schoolSearch
                                    }
                                    onChange={(e) => {
                                        setSchoolSearch(
                                            e.target.value
                                        );

                                        setForm(
                                            (prev) => ({
                                                ...prev,
                                                school_id:
                                                    "",
                                            })
                                        );

                                        setShowSchoolDropdown(
                                            true
                                        );
                                    }}
                                    onFocus={() =>
                                        setShowSchoolDropdown(
                                            true
                                        )
                                    }
                                    placeholder={
                                        loadingSchools
                                            ? "Loading schools..."
                                            : "Search school..."
                                    }
                                    disabled={
                                        loadingSchools ||
                                        loading
                                    }
                                    autoComplete="off"
                                    className="
                                        h-10
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                        disabled:bg-gray-50
                                    "
                                />

                                {showSchoolDropdown &&
                                    !loadingSchools && (
                                        <div
                                            className="
                                                absolute
                                                left-0
                                                right-0
                                                top-full
                                                z-20
                                                mt-1
                                                max-h-60
                                                overflow-y-auto
                                                rounded-lg
                                                border
                                                border-gray-200
                                                bg-white
                                                shadow-lg
                                            "
                                        >
                                            {filteredSchools.length >
                                                0 ? (
                                                filteredSchools.map(
                                                    (
                                                        school
                                                    ) => (
                                                        <button
                                                            key={
                                                                school.id
                                                            }
                                                            type="button"
                                                            onMouseDown={(
                                                                e
                                                            ) => {
                                                                e.preventDefault();

                                                                handleSchoolSelect(
                                                                    school
                                                                );
                                                            }}
                                                            className="
                                                                flex
                                                                w-full
                                                                flex-col
                                                                items-start
                                                                px-3
                                                                py-2.5
                                                                text-left
                                                                transition
                                                                hover:bg-gray-50
                                                            "
                                                        >
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {
                                                                    school.name
                                                                }
                                                            </span>

                                                            <span className="mt-0.5 text-xs text-gray-500">
                                                                {school.short_name && (
                                                                    <>
                                                                        {
                                                                            school.short_name
                                                                        }

                                                                        {" • "}
                                                                    </>
                                                                )}

                                                                {
                                                                    school.location
                                                                }
                                                            </span>
                                                        </button>
                                                    )
                                                )
                                            ) : (
                                                <div className="px-3 py-4 text-center text-sm text-gray-500">
                                                    No schools
                                                    found.
                                                </div>
                                            )}
                                        </div>
                                    )}
                            </div>

                            {form.school_id && (
                                <p className="mt-1.5 text-xs text-green-600">
                                    ✓ School selected
                                </p>
                            )}
                        </div>

                        {/* Degree / Field */}
                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                sm:grid-cols-2
                            "
                        >
                            {/* Degree */}
                            <div>
                                <label
                                    htmlFor="degree"
                                    className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    Degree
                                </label>

                                <select
                                    id="degree"
                                    name="degree"
                                    value={
                                        form.degree
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    disabled={loading}
                                    className="
                                        h-10
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                        disabled:bg-gray-50
                                    "
                                >
                                    <option value="">
                                        Select degree
                                    </option>

                                    {degrees.map(
                                        (degree) => (
                                            <option
                                                key={
                                                    degree
                                                }
                                                value={
                                                    degree
                                                }
                                            >
                                                {degree}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Field */}
                            <div>
                                <label
                                    htmlFor="field_of_study"
                                    className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    Field of Study
                                </label>

                                <select
                                    id="field_of_study"
                                    name="field_of_study"
                                    value={
                                        form.field_of_study
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    disabled={loading}
                                    className="
                                        h-10
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                        disabled:bg-gray-50
                                    "
                                >
                                    <option value="">
                                        Select field
                                    </option>

                                    {fieldsOfStudy.map(
                                        (field) => (
                                            <option
                                                key={
                                                    field
                                                }
                                                value={
                                                    field
                                                }
                                            >
                                                {field}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Dates */}
                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                sm:grid-cols-2
                            "
                        >
                            {/* Start */}
                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    Start Date
                                </label>

                                <input
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={
                                        form.start_date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    disabled={loading}
                                    className="
                                        h-10
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                        disabled:bg-gray-50
                                    "
                                />
                            </div>

                            {/* End */}
                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    End Date
                                </label>

                                <input
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    value={
                                        form.end_date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min={
                                        form.start_date ||
                                        undefined
                                    }
                                    disabled={
                                        loading ||
                                        !form.start_date
                                    }
                                    className="
                                        h-10
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                        disabled:bg-gray-50
                                    "
                                />

                                <label className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                    <input
                                        type="checkbox"
                                        checked={
                                            !form.end_date
                                        }
                                        onChange={(e) => {
                                            if (
                                                e.target
                                                    .checked
                                            ) {
                                                setForm(
                                                    (
                                                        prev
                                                    ) => ({
                                                        ...prev,
                                                        end_date:
                                                            "",
                                                    })
                                                );
                                            }
                                        }}
                                        disabled={
                                            loading
                                        }
                                    />

                                    Currently studying
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="
                                    mb-1.5
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={
                                    form.description
                                }
                                onChange={
                                    handleChange
                                }
                                rows={5}
                                disabled={loading}
                                placeholder="Describe your studies, achievements, activities..."
                                className="
                                    w-full
                                    resize-none
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3 py-2.5
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:bg-gray-50
                                "
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            border-t
                            px-6 py-4
                        "
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-4 py-2
                                text-sm
                                font-medium
                                text-gray-700
                                transition
                                hover:bg-gray-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                loadingSchools
                            }
                            className="
                                rounded-lg
                                bg-primary
                                px-4 py-2
                                text-sm
                                font-medium
                                text-primary-foreground
                                shadow-sm
                                transition
                                hover:bg-primary/90
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Update Education"
                                    : "Add Education"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}