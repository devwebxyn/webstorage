// src/components/manage/StorageSelector.tsx
import React from 'react';

// Tipe data untuk setiap opsi penyimpanan
type StorageOption = {
  id: 'supabase' | 'mega' | 'internxt';
  name: string;
  iconSrc: string; // Menggunakan URL atau data URI untuk sumber gambar
};

// Definisikan data untuk setiap cloud storage dengan logo dari URL
const storageOptions: StorageOption[] = [
  { 
    id: 'supabase', 
    name: 'Supabase', 
    iconSrc: 'data:image/jpeg;base64,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' 
  },
  { 
    id: 'mega', 
    name: 'MEGA.nz', 
    iconSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEXTGwD////QAADppKDSBwDif3rjiITTEgDmlI/UIArTFQD56Ofssa73393yycfkjYj88/Lig37ZSkDbXFTXPzTttrPebmf++fnvv7z12NbVMSTz0M7eamPfcmzdZV7bWFDpoZ3XQDb77ezXOy/VLBzpop7geXPVLB7ww8DrrKjnmJQuYNhJAAAKV0lEQVR4nOXda3uiOhAAYBKjVLyheKtd7XW7p/3/P/AEUEEgyUwyaND5tM9Tt/I2kBvJJGCtRzyZrnpP/XWyeN99DYPh8N/7Iln3n3qr6SRu/+uDNn/5ZPu7f+dZCBFGURTkIf8VCpH/YLl/247avIi2hKPtYJHJTipVRJl0MVi1xWxDOBrvQ4Ct6gz34zaU5MLpfIjUlZXD+ZT6gkiFm9XBUldWHlYbyosiFG5TnoPuFClyS3dZVMLnvnyQCHh5yMe4/0x0ZTTC8SdJ6ZVD8M8xybURCD8GnLs8e6qIOJ8R9AichZM1efEVIfh+cmPhc9KiLzcmjg+kk3DySli7qCLkr07l6CAcHa7gy40Hh86OtXDTb/n+LIfgfetegK3w54q+3PhzVeHzjl/Vlwbf2VU5VsLvVto/U0T8+0rCqbjuDVqEEBYjD7xwf5MCzCPi+9aFL+GtCjAPEb60K5zdsADziPisRWG8vH4VWg++RPXHMcLplfowpgg5psJBCJ98KMA8+FMbwsQfoCQm5MJ4d9s6tBpiB30YgcKJJ49gESEHjqlgwunNG4l6RMD6BiQc+/QIFsFBU1UQ4ZufQEl8oxF61EpUA9JqmIUzf4GSaO7CGYVeAyFEk9DjWzQP441qEHpbyRRhqm70Qk+bicswNBpa4bQLQEnUNv064aQbQEnUdeA0wtjDrlpzRFzTDdcId751ttUR7myEiV/DJX0I9XhRKfS+IbwM/osVdqQaLUJZoSqEcdeAkqiobRTCZXdqmVOE7xih593t5lB0whuFL10ESmLjhH+j0Gnh1u0iCqHCdZdawnKINUz4Xzfv0TT4fyBhR+/RNCIBEX539R5NQ9RfhNeEz929R9PgteUMNeGuu/doGlFtlFEV/nS7CGUhVtfdVISbrgMlcaMV9rtczeQh+jrhqPtFKAtxpBEeul+EshAPamFnJtf0cTn1diF87d6osCnCV5Ww4419ERfNflmY3EcRykJMmoV38hSmUX4SS8LODgvrUR4oFsIPSBFGoSoE7S0ecdVXRZCOM/9oEM4ARciZOt4pb4FI87JlDvgiUcxKFUJIEeqElEQdENazLK70LAS9DNUK2ScVUQsECs+vTc/CT9DtrRVSEfVAmDD6rAphTYVByEiW9xmAwPHP+ZechJDH1yykIEb1iQgboZhXhLDW3ijc/HNtNIxA6Bj2dK1H4ZZIyDZfjkQjECzcXgj/4P4uOuLQiWgGQoXiz4UQ2CUFCFnsQgQAwTMtvCxcEQpZHFgTIUC4cFUSAm9SmJDFoK5j068H7YeBCo+3aS6EjptgQhaHVkQYED4fyAsheFkCUMg+bN7uAIEI4fQshDX3CKENEQqEC/NGPxMOoZcDFsrRJpIIBsKF0fAkhM8Dw4Xyl6KIiK1M8Hn5bG44FcJXkSKEOCJmrxZCOD4K9/D/ghBiiKjNaHCh2B+F8LodJYQTUUCEMFucEaBex+CEctAJIuKAmPdj6YMYgMcVFkIYsWkBBZVwmwkHiP+BFEKIWCBGKAaZcAGv89BC9mwiooEYYbTIhIjJfLzQ9LqH43NeYd5T81SIee9rIdQTLYA44UgKERWNlVC30tEGiBNupfC3baGaaAXECd+kEN6jsRWqiHZAlFD2agK2xHQf7YTNA9DjLEOrwmgphZj3orbCJqItELfmh7MAtSrfWlhftGoNRArjAPVu215YrbLtgUjhJEBtHXEQXhJhG80phNMAOlXqLCxPyroAkcJV0LuasCA6AZHCXgB5fU8kPE2XWKdesxCKpwBZ9xIQHYFIYT9YY14y6ISgVCM/HAh0XalwinAdJJhJP53wd675YYnYg3xsrtxOiBRGSYAY/+qFPVgSLlBqwJnu74ATLgJMt9QgxOYZ0wDphO/BF+LjBiEkDwcMGJAJpW9IKKQhppsf6YRDWiEFMdvdSSlEhVHoTsy3r9IJkWEWuhKP+3MphbR3afoZRD48FZD0LqWsS52J5zQHlHUpaE0iSmhPLPI40LWHn5R9muJjdsRSogrKPg1Zv7Q80LQiljNx0AkTurHFxVDagniRaoRMKMcWZOPDy8kCNPEylwqZUI4Pycb4lekQJLGSLIZOOKObp6n+IhSxmg2HTMh7dHNttT8VglhL90MnXNHNl9ZvBjCxns+ITjilm/NuuN2BxIaETXTCCd17i6YHGkRsykhFJ4zp3j01VlkAYmPKLToh4fvD5krZSGzOKUYlzN4fUr0DVjQ7BqIiaRqVMHsHjEngaSHUE1VZ4aiE2Xt8qrUYyq6DhqhMe0cm3BKup1F3jpREdV4/MuGIcE2UpvunIGoSF5IJKde16Tq4jURdZkYi4XFdG9HaRG0XvoGoTT1JJDyuTSRaX6ofpNSI+tyaRMLj+lKiNcKGYViFaEgeSiXM1wgj0pc5CAMeDIsITB8mEWbJzVIhPJmCizA9ybkI0xeRCM9r9Wn2W6AmC4xfRCI877eg2TPjo/C0Z4YFFPue/BMW+55o9q75JyztXSPZf+ifsLT/kGQPqYdCVggp9gF7J7zYB0yxl9s74cVebor9+P4JWVlIkFPBN2ElpwJBXgzfhJW8GAS5TbwTskuhe34az4S1/DTuOYY8E9ZyDLnnifJLWM8T5Z7ryy9hQ64v53xtngnPH6fLuUeaRVq3GNw65x4kb6IYKGNGmt41TGbKL4LM7zbmTQRN1wh10GaGDNVfBAA25758gPyl95+D9gHyCN9/Luh7eRI1+bzvPyf7A+TVh8+c+huissPs4c63uP8zSh7gnJmuN/uAs4Lu/7ynBziz6wHOXevuIQnQs/M6e5/Czz98gDMs7/8cUsbeuzdSxJ0l+wDnAd//mc4PcC73A5ytLkcZ3altwtqIAiSMsQmrbxaRqpYxCLsz9aY9tkUn7EqFqs9DrBUiVp7eMAyZw/RC9td/Iv+rJxiE/jeLxs1xJqHvnXBzKhWj0G8iIFeMWejzjQrZhQsQonYoXjX4G+DqIUJfGw1YgkmQUDb9/nXgIuCBAzCh7MD51g0PDSfsYYUsJjn4jy7ETtPZthLK8aJPDyNXjwfthajk7S2HekTvJJT1jR8PY4g61AQjZPHSh2LkS+gjiBcyNrh5sxFhk/ohhexF3LZOFSH4bC9LIWPrGxZjxJveLlEL2fRmxSgE7twkWyFj3zcpxojXX2G3JWTPu+tXqnwHSrJMJEzX3Vz3VhXWec5thWzTv6JR8P7GfEnEQsZGhyv1cUJ+GJkvpwWhHFO9XsEY8lfgOKkFoaxykpbvVcETuwqGSijLcd2iUfC9U/mRCBn7mPFW2seI8xmqj92aUMZ4SV6Qgi+dTjI5B41Q3qxzTljrhJzPnW/PY1AJZWwPnKQkBecHu/PKGoNQKHsBqxTp8kxGKW9l3bo3Bakwjek8sFSmumBuMXrQB7lQxmi8D5HKVBfuxw5dF2W0IUxjtB0sOAc4Uxvni/mqDV0abQmzmGx/90uehRBhkR1K/isUIv/Bcv+7bQuXRavCPOLJdNWbff9JFp9fw2EQDHfLRfLne9ZbTScELbop/gcYapThXlVslgAAAABJRU5ErkJggg==' 
  },
  { 
    id: 'internxt', 
    name: 'Internxt', 
    iconSrc: 'https://www.softwareworld.co/assets/software/logo/internxt.png' 
  },
];

type StorageSelectorProps = {
  selectedStorage: string;
  onStorageChange: (storageId: 'supabase' | 'mega' | 'internxt') => void;
};

export const StorageSelector: React.FC<StorageSelectorProps> = ({ selectedStorage, onStorageChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Pilih Cloud Storage
      </label>
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
        {storageOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onStorageChange(option.id)}
            className={`flex-1 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${selectedStorage === option.id
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                : 'bg-transparent text-slate-500 hover:bg-slate-200/50'
              }`
            }
          >
            <img 
              src={option.iconSrc} 
              alt={`${option.name} logo`} 
              className="h-5 w-auto" // Menggunakan tinggi tetap dan lebar otomatis
            />
            <span>{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};