"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { addTaskAction, removeTaskAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-provider";

type Task = {
  id: string;
  task_text: string;
};

type TaskListManagerProps = {
  initialTasks: Task[];
};

export function TaskListManager({ initialTasks }: TaskListManagerProps) {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskText, setTaskText] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();


  const addTask = () => {
    const nextTask = taskText.trim();
    if (!nextTask) return;

    setError(null);
    startTransition(async () => {
      try {
        const createdTask = await addTaskAction(nextTask);
        setTasks((prev) => [createdTask, ...prev]);
        setTaskText("");
        setIsInputVisible(false);
      } catch {
        setError("Taskin lisays epaonnistui.");
      }
    });
  };

  const removeTask = (taskId: string) => {
    setError(null);
    startTransition(async () => {
      try {
        await removeTaskAction(taskId);
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
      } catch {
        setError("Taskin poisto epaonnistui.");
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsInputVisible((prev) => !prev)}
          disabled={isPending}
        >
          {t("home.addTask")}
        </Button>
      </div>

      {isInputVisible ? (
        <div className="flex gap-2">
          <Input
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
            placeholder={t("home.taskPlaceholder")}
            aria-label="Task input"
            disabled={isPending}
          />
          <Button size="sm" onClick={addTask} disabled={isPending}>
            {t("home.saveTask")}
          </Button>
        </div>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("home.noTasksYet")}</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between gap-2 text-sm">
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
                <p className="text-muted-foreground">{task.task_text}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => removeTask(task.id)}
                aria-label={`Delete task ${task.task_text}`}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
