"use-strict"
import { Construct } from 'constructs';

export class ServiceHelper {
    protected construct: Construct;

    constructor(construct: Construct) {
        this.construct = construct;
    }
}