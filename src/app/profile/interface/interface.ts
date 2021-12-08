import { ReactSVG } from "react";

export interface StudyInterface{
    studyId:number;
    // name?:string;
    title:string;
    currentNumber:number;
    maxNumber:number;
    // date?:Date;
    // tags?:string[]
}

export interface ArticleInterface{
    articleId:number;
    title:string;
    author:string;
    recommendation:number;
    isBookmark:boolean;
}

export interface RecruitingStudyInterface extends StudyInterface{
    category:string;
    newInquiry:number;
    newApplicant:number;
}

export interface RecruitedStudyInterface extends StudyInterface{
    date:Date;
    name:string;
    tags:string[]
}