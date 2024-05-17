export class Marketing
{
    private _id: number;
    private _farmId: number;
    private _subCategoryId: number;
    private _active: boolean;
    private _heading: string;
    private _caption: string;
    private _startDate: Date;
    private _endDate: Date;

    constructor()
    {
    }
    get farmId(): number
    {
        return this._farmId;
    }
    set farmId (value: number)
    {
        this._farmId = value;
    }
}
const m: Marketing = new Marketing();

