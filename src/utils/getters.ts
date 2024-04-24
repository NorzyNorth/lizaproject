import { COLUMNS_ACTIVITY, COLUMNS_ACTIVITY_FULL, COLUMNS_DISCIPLINES, COLUMNS_DISCIPLINES_FULL, COLUMNS_TEACHERS, COLUMNS_TEACHERS_FULL, TITLES_ACTIVITY, TITLES_ACTIVITY_FULL, TITLES_DISCIPLINES, TITLES_DISCIPLINES_FULL, TITLES_TEACHERS, TITLES_TEACHERS_FULL } from "@/constants/constants"

export const getColumns = (name: any, isFull: boolean = false) => {
    if (name === 'teachers') {
        if (isFull) {
            return COLUMNS_TEACHERS_FULL;
        }
        return COLUMNS_TEACHERS;
    } else if (name === 'disciplines') {
        if (isFull) {
            return COLUMNS_DISCIPLINES_FULL;
        }
        return COLUMNS_DISCIPLINES;
    } else if (name === 'publishingActivity') {
        if (isFull) {
            return COLUMNS_ACTIVITY_FULL;
        }
        return COLUMNS_ACTIVITY;
    }
}

export const getTitles = (name: any, isFull: boolean = false) => {
    if (name === 'teachers') {
        if (isFull) {
            return TITLES_TEACHERS_FULL.map((title) => title);
        }
        return TITLES_TEACHERS.map((title) => title);
    } else if (name === 'disciplines') {
        if (isFull) {
            return TITLES_DISCIPLINES_FULL.map((title) => title);
        }
        return TITLES_DISCIPLINES.map((title) => title);
    } else if (name === 'publishingActivity') {
        if (isFull) {
            return TITLES_ACTIVITY_FULL.map((title) => title);
        }
        return TITLES_ACTIVITY.map((title) => title);
    }
}