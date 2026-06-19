import {Signer} from "@aws-sdk/rds-signer"
import {Pool, PoolConfig} from "pg"

class DatabaseService {
    private pool: Pool | null = null
    private tokenExpiry: number = 0
    private cachedToken: string | null = null

    private readonly isDev = process.env.ENVIRONMENT === "dev"
    private readonly host = process.env.DB_HOST!
    private readonly db_port = process.env.DB_PORT!
    private readonly database = process.env.DB_NAME!

    private readonly port = parseInt(this.db_port, 10)
    private readonly region = process.env.AWS_REGION!

    public async getPool(): Promise<Pool> {
        if (this.pool) {
            return this.pool
        }

        const user = this.getUsername()
        const password = await this.getPassword()

        const config: PoolConfig = {
            host: this.host,
            port: this.port,
            database: this.database,
            user,
            password,
            max: 3,
            idleTimeoutMillis: 10000,
            connectionTimeoutMillis: 1000,
            ssl: {
                rejectUnauthorized: false,
            },
        }

        this.pool = new Pool(config)

        this.pool.on("error", (err) => {
            console.error("Unexpected error on idle database client", err)
            this.pool = null
        })

        return this.pool
    }

    private getUsername(): string {
        return process.env.DB_USER!
    }

    private async getPassword(): Promise<string> {
        if (!this.isDev) {
            return process.env.DB_PASSWORD!
        }

        const now = Date.now()
        if (this.cachedToken && now < this.tokenExpiry) {
            return this.cachedToken
        }

        const signer = new Signer({
            hostname: this.host,
            port: this.port,
            username: this.getUsername(),
            region: this.region,
        })

        this.cachedToken = await signer.getAuthToken()
        this.tokenExpiry = now + 12 * 60 * 1000
        return this.cachedToken
    }
}

export const dbService = new DatabaseService()
