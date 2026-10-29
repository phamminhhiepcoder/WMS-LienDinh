
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Upload,
    X,
    Loader2,
    Eye,
    EyeOff,
} from 'lucide-react';

import type { BrandRecord } from '../../../types/brand';

interface AdminBrandFormProps {
    brand: BrandRecord | null;
    onClose: () => void;
}

export default function AdminBrandForm({
    brand,
    onClose,
}: AdminBrandFormProps) {
    const { t } = useTranslation('brands');
    const { t: c } = useTranslation('common');

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isSaving] = useState(false);
    const [isUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (file?: File) => {
        if (!file) return;

        setUploadError('');

        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/gif',
        ];

        if (!allowedTypes.includes(file.type)) {
            setUploadError(t('form.logoInvalidType'));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError(t('form.logoTooLarge'));
            return;
        }

        const objectUrl = URL.createObjectURL(file);

        setPreviewUrl((previousUrl) => {
            if (previousUrl) URL.revokeObjectURL(previousUrl);
            return objectUrl;
        });

        setLogo(objectUrl);
    };

    useEffect(() => {
        setName(brand?.name ?? '');
        setSlug(brand?.slug ?? '');
        setDescription(brand?.description ?? '');
        setLogo(brand?.logo ?? '');
        setIsActive(brand?.isActive ?? true);
        setPreviewUrl('');
        setUploadError('');
    }, [brand]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleRemoveLogo = () => {
        setLogo('');
        setPreviewUrl('');
        setUploadError('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isSaving &&
                    !isUploading
                ) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="brand-modal-title"
                className="relative my-auto w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
                <div className="border-b border-slate-100 pb-3">
                    <h2
                        id="brand-modal-title"
                        className="text-base font-extrabold text-slate-900"
                    >
                        {brand ? t('editBrand') : t('form.createSubmit')}
                    </h2>
                </div>

                <form className="space-y-4">
                    {/* Brand name */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {t('form.nameLabel')}{' '}
                            <span className="text-purple-600">*</span>
                        </label>

                        <input
                            type="text"
                            required
                            maxLength={100}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={t('form.namePlaceholder')}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {t('form.slugLabel')}
                        </label>

                        <input
                            type="text"
                            value={slug}
                            onChange={(event) => setSlug(event.target.value)}
                            placeholder={t('form.slugPlaceholder')}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                        />
                    </div>

                    {/* Brand logo */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {t('form.logoLabel')}
                        </label>

                        {logo ? (
                            <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <img
                                    src={logo}
                                    alt={t('logoAlt', { name })}
                                    className="max-h-full max-w-full object-contain"
                                />

                                <button
                                    type="button"
                                    disabled={isUploading || isSaving}
                                    onClick={handleRemoveLogo}
                                    className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-sm transition-opacity hover:bg-red-700 focus:opacity-100 group-hover:opacity-100 disabled:cursor-not-allowed"
                                >
                                    <X className="h-3.5 w-3.5" />
                                    {t('form.logoRemove')}
                                </button>
                            </div>
                        ) : (
                            <div
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={(event) => {
                                    event.preventDefault();

                                    if (!isUploading && !isSaving) {
                                        handleImageChange(
                                            event.dataTransfer.files[0],
                                        );
                                    }
                                }}
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 transition-colors hover:border-purple-400 hover:bg-purple-50/30"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                                    <Upload className="h-5 w-5" />
                                </div>

                                <div className="text-center">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {c('form.dragDropImage')}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {c('form.orChooseImage')}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    disabled={isUploading || isSaving}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-xl border border-purple-200 bg-white px-4 py-2 text-xs font-bold text-purple-700 transition-colors hover:bg-purple-50 disabled:opacity-50"
                                >
                                    {t('form.logoUpload')}
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/gif"
                                    className="hidden"
                                    disabled={isUploading || isSaving}
                                    onChange={(event) => {
                                        handleImageChange(
                                            event.target.files?.[0],
                                        );

                                        event.target.value = '';
                                    }}
                                />

                                <span className="text-center text-[10px] text-slate-400">
                                    {t('form.logoHint')}
                                </span>

                                {uploadError && (
                                    <p
                                        role="alert"
                                        className="text-xs font-medium text-red-500"
                                    >
                                        {uploadError}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {t('form.descriptionLabel')}
                        </label>

                        <textarea
                            rows={3}
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder={t('form.descriptionPlaceholder')}
                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                        />
                    </div>

                    {/* Active status */}
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-purple-200">
                        <div className="flex min-w-0 items-center gap-3">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${isActive
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-slate-100 text-slate-400'
                                    }`}
                            >
                                {isActive ? (
                                    <Eye className="h-5 w-5" />
                                ) : (
                                    <EyeOff className="h-5 w-5" />
                                )}
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-slate-800">
                                    {t('form.statusLabel')}
                                </h3>

                                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                    {isActive
                                        ? t('form.activeDescription')
                                        : t('form.inactiveDescription')}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={isActive}
                            aria-label={t('form.statusLabel')}
                            onClick={() => setIsActive((value) => !value)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 ${isActive ? 'bg-purple-600' : 'bg-slate-300'
                                }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${isActive
                                    ? 'translate-x-[22px]'
                                    : 'translate-x-0.5'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving || isUploading}
                            className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50"
                        >
                            {t('cancel')}
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isSaving ||
                                isUploading ||
                                !name.trim()
                            }
                            className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-purple-600/15 transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving && (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            )}

                            {isSaving
                                ? t('form.saving')
                                : brand
                                    ? t('form.updateSubmit')
                                    : t('form.createSubmit')}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
