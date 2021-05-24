import { Timestamp } from './../../auth/models/timestamp.model';
interface TimeExercise {
    title?: string;
    isTime?: boolean;
    seconds?: number;
    minutes?: number;
    hours?: number;
    iconSrc?: string;
    iconId?: number;
}

export interface AdminWorkoutSingleExercise {
    title?: string;
    iconId?: number;
    iconSrc?: string;
    exerciseId?: string;
    videoLink?: string;
    videoThumbnail?: string;
    note?: string;
}

export interface WorkoutSingleExercise extends TimeExercise {
    quantity?: number | 'max';
    duration?: TimeExercise;
    completed?: boolean;
    note?: string;
    videoLink?: string;
    selected?: boolean; /* TODO Make it mandatory */
}

export interface WorkoutExerciseRound {
    title: string;
    difficulty: 1 | 2 | 3;
    exercises: WorkoutSingleExercise[];
    duration?: TimeExercise;
    repetitions?: number;
    completed?: boolean;
    note?: string;
}

export interface WorkoutWeekDay {
    day: number;
    exDayName: string;
    exDayDesc?: string;
    restDay: boolean;
    exDone: number;
    exToDo: number;
    selected: boolean;
    hideView?: boolean;
    completed?: boolean;
    dayImage?: string;
    dateDetails?: { name: string; day: number };
    exercises1?: WorkoutExerciseRound[];
    exercises2?: WorkoutExerciseRound[];
    exercises3?: WorkoutExerciseRound[];
}

export interface WorkoutWeek {
    weekNumber: number;
    status: 'private' | 'public';
    week: WorkoutWeekDay[];
    type?: 'functional' | 'gym' | 'pro';
    completed?: boolean;
    weekId?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
