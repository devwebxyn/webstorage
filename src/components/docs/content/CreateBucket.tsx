// src/components/docs/content/CreateBucket.tsx
import { CodeBlock } from '../CodeBlock';

export const CreateBucket = () => (
    <section id="create-bucket" className="scroll-mt-24">
        <h2>Bucket API: Buat Bucket</h2>
        <p>Bucket adalah kontainer logis untuk menyimpan file Anda. Nama bucket harus unik di seluruh proyek Anda.</p>
        <p><strong>Endpoint:</strong> <code>POST /storage/v1/bucket</code></p>

        <h3 className="mt-6">Request Body (JSON)</h3>
        <ul>
            <li><code>name</code> (string): **Wajib.** Nama unik untuk bucket Anda.</li>
            <li><code>id</code> (string): **Wajib.** ID unik untuk bucket Anda.</li>
            <li><code>public</code> (boolean): Opsional. Jika `true`, semua file di dalam bucket ini bisa diakses secara publik tanpa autentikasi. Defaultnya `false`.</li>
        </ul>

        <h3 className="mt-6">Contoh menggunakan cURL</h3>
        <CodeBlock code={`curl -X POST 'https://your-project.cloudnest.io/storage/v1/bucket' \\\n-H 'Authorization: Bearer YOUR_SECRET_KEY' \\\n-H 'Content-Type: application/json' \\\n-d '{\n  "id": "user_avatars",\n  "name": "user_avatars",\n  "public": false\n}'`} language="bash" />

        <h3 className="mt-6">Contoh Respons Sukses (200)</h3>
        <CodeBlock code={`{\n  "name": "user_avatars"\n}`} language="json" />
    </section>
);