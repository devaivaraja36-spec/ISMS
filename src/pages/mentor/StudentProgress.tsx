import MentorSidebar from "../../components/layout/MentorSidebar";

function StudentProgress() {
  return (
    <div className="min-h-screen bg-slate-950">
      <MentorSidebar />

      <main className="ml-64 min-h-screen p-8">
        <h1 className="text-3xl font-bold text-white">Student Progress</h1>
        <p className="mt-2 text-slate-400">
          Monitor the progress of your students.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Students</p>
            <h2 className="mt-3 text-3xl font-bold text-white">4</h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Average Progress</p>
            <h2 className="mt-3 text-3xl font-bold text-green-400">67%</h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Tasks Completed</p>
            <h2 className="mt-3 text-3xl font-bold text-purple-400">53</h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Average Attendance</p>
            <h2 className="mt-3 text-3xl font-bold text-orange-400">91%</h2>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Student Progress
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-300">Arun Kumar</span>
                <span className="text-blue-400">65%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-300">Rahul Sharma</span>
                <span className="text-blue-400">82%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-300">Priya Nair</span>
                <span className="text-blue-400">48%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: "48%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-300">Vikram Singh</span>
                <span className="text-blue-400">71%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: "71%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentProgress;
