import express from "express";

export interface AuthRequest extends express.Request {
    userId?: string;
    userName?: string;
    roles?: Role[];
}

export enum Role {
    CREW = 'crew',
    MNG = 'manager',
    HR = 'hr',
    SUP = 'supervisor'
}