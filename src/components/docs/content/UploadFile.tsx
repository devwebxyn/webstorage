// src/components/docs/content/UploadFile.tsx
import { CodeBlock } from '../CodeBlock';

export const UploadFile = () => (
    <section id="upload-file" className="scroll-mt-24">
        <h2>File API: Upload File</h2>
        <p>Endpoint ini digunakan untuk mengunggah file baru ke sebuah bucket. Permintaan harus menggunakan `multipart/form-data` dan menyertakan file biner.</p>
       <p><strong>Endpoint:</strong> <code>POST /storage/v1/object/&#123;bucket-name&#125;/&#123;path-to-file&#125;</code></p>
        
        <h3 className="mt-6">Headers</h3>
        <ul>
            <li><code>Authorization</code>: **Wajib.** Bearer token menggunakan Secret Key Anda.</li>
            <li><code>Content-Type</code>: **Wajib.** Harus diset ke `multipart/form-data`.</li>
            <li><code>x-upsert</code>: Opsional. Jika diset ke `true`, file akan ditimpa jika sudah ada. Defaultnya adalah `false`.</li>
        </ul>

        <h3 className="mt-6">Contoh menggunakan SDK (Direkomendasikan)</h3>
        <p>Contoh ini mengunggah file yang dipilih pengguna ke dalam folder `public` di dalam bucket `avatars`.</p>
        <CodeBlock code={`const handleFileUpload = async (file) => {\n  try {\n    const { data, error } = await cloudnest.storage\n      .from('avatars')\n      .upload('public/avatar1.png', file, {\n        cacheControl: '3600',\n        upsert: false\n      })\n\n    if (error) throw error;\n\n    console.log('File uploaded:', data.path)\n  } catch (error) {\n    console.error('Error uploading file:', error.message)\n  }\n}`} language="javascript" />

        <h3 className="mt-6">Contoh Respons Sukses (200)</h3>
        <CodeBlock code={`{\n  "path": "public/avatar1.png",\n  "id": "c2a1a8f0-7b6a-4d99-b12a-36b1a63a5c37",\n  "fullPath": "avatars/public/avatar1.png"\n}`} language="json" />
    </section>
);